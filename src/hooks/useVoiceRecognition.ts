import React, { useEffect, useState, useCallback } from 'react';
import Voice from '../index';
import type { SpeechErrorEvent, SpeechResultsEvent } from '../VoiceModuleTypes';

export interface UseVoiceRecognitionOptions {
  /**
   * Language locale for speech recognition
   * @default 'en-US'
   */
  locale?: string;

  /**
   * Whether to enable partial results (real-time transcription)
   * @default true
   */
  enablePartialResults?: boolean;

  /**
   * Whether to continue listening after getting results (continuous mode)
   * When enabled, the microphone will automatically restart after getting results
   * @default false
   */
  continuous?: boolean;

  /**
   * Maximum silence duration in milliseconds before stopping (continuous mode)
   * Only applies when continuous mode is enabled
   * @default 5000 (5 seconds)
   */
  maxSilenceDuration?: number;

  /**
   * Callback fired when speech is recognized
   */
  onResult?: (text: string) => void;

  /**
   * Callback fired when an error occurs
   */
  onError?: (error: string) => void;
}

export interface UseVoiceRecognitionReturn {
  /**
   * Whether voice recognition is currently active
   */
  isRecording: boolean;

  /**
   * Final recognized text results
   */
  results: string[];

  /**
   * Partial results (real-time transcription)
   */
  partialResults: string[];

  /**
   * Error message if an error occurred
   */
  error: string | null;

  /**
   * Start voice recognition
   */
  start: () => Promise<void>;

  /**
   * Stop voice recognition and get final results
   */
  stop: () => Promise<void>;

  /**
   * Cancel voice recognition without getting results
   */
  cancel: () => Promise<void>;

  /**
   * Reset all state
   */
  reset: () => void;
}

/**
 * Custom hook for voice recognition
 *
 * Provides a simple interface for speech-to-text functionality with automatic
 * event listener setup and cleanup.
 *
 * @example
 * ```tsx
 * const { isRecording, results, start, stop } = useVoiceRecognition({
 *   locale: 'en-US',
 *   onResult: (text) => setSearchQuery(text),
 * });
 *
 * // In your component
 * <Button
 *   onPress={isRecording ? stop : start}
 *   title={isRecording ? 'Stop' : 'Start Recording'}
 * />
 * <Text>{results[0]}</Text>
 * ```
 */
export const useVoiceRecognition = (
  options: UseVoiceRecognitionOptions = {},
): UseVoiceRecognitionReturn => {
  const {
    locale = 'en-US',
    enablePartialResults = true,
    continuous = false,
    maxSilenceDuration = 5000,
    onResult,
    onError,
  } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [partialResults, setPartialResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const shouldContinueRef = React.useRef(false);
  const silenceTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const accumulatedTextRef = React.useRef<string>('');

  useEffect(() => {
    // Clear any existing timers on cleanup
    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Set up event listeners
    Voice.onSpeechStart = () => {
      setIsRecording(true);
      setError(null);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };

    Voice.onSpeechEnd = async () => {
      setIsRecording(false);

      // In continuous mode, restart listening after results
      if (continuous && shouldContinueRef.current) {
        setTimeout(async () => {
          if (shouldContinueRef.current) {
            try {
              await Voice.start(locale, {
                EXTRA_PARTIAL_RESULTS: enablePartialResults,
              });
            } catch (err) {
              console.error('Failed to restart voice recognition:', err);
            }
          }
        }, 100);
      }
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      const errorMessage = e.error?.message || 'Unknown error';
      setError(errorMessage);
      setIsRecording(false);
      shouldContinueRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      onError?.(errorMessage);
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0) {
        if (continuous) {
          // Append new text to accumulated text
          const newText = e.value[0];
          accumulatedTextRef.current = accumulatedTextRef.current
            ? accumulatedTextRef.current + ' ' + newText
            : newText;
          setResults([accumulatedTextRef.current, ...e.value.slice(1)]);
          onResult?.(accumulatedTextRef.current);
        } else {
          setResults(e.value);
          const firstResult = e.value[0];
          if (firstResult) {
            onResult?.(firstResult);
          }
        }
      }
    };

    if (enablePartialResults) {
      Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
        if (e.value && e.value.length > 0) {
          setPartialResults(e.value);

          // Reset silence timer on partial results (user is speaking)
          if (continuous && silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(async () => {
              if (shouldContinueRef.current) {
                shouldContinueRef.current = false;
                if (silenceTimerRef.current) {
                  clearTimeout(silenceTimerRef.current);
                  silenceTimerRef.current = null;
                }
                await Voice.stop();
              }
            }, maxSilenceDuration);
          }
        }
      };
    }

    // Cleanup
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [
    enablePartialResults,
    onResult,
    onError,
    continuous,
    locale,
    maxSilenceDuration,
  ]);

  const start = useCallback(async () => {
    try {
      setError(null);
      if (!continuous) {
        setResults([]);
        setPartialResults([]);
        accumulatedTextRef.current = '';
      }
      shouldContinueRef.current = true;

      // Check permission (Android only)
      const hasPermission = await Voice.checkMicrophonePermission();
      if (!hasPermission) {
        const granted = await Voice.requestMicrophonePermission();
        if (!granted) {
          setError('Microphone permission denied');
          return;
        }
      }

      await Voice.start(locale, {
        EXTRA_PARTIAL_RESULTS: enablePartialResults,
      });

      // Start silence timer if in continuous mode
      if (continuous) {
        silenceTimerRef.current = setTimeout(async () => {
          if (shouldContinueRef.current) {
            shouldContinueRef.current = false;
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            await Voice.stop();
          }
        }, maxSilenceDuration);
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to start recording';
      setError(errorMessage);
      shouldContinueRef.current = false;
      onError?.(errorMessage);
    }
  }, [locale, enablePartialResults, onError, continuous, maxSilenceDuration]);

  const stop = useCallback(async () => {
    try {
      shouldContinueRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      await Voice.stop();
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to stop recording';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError]);

  const cancel = useCallback(async () => {
    try {
      shouldContinueRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      await Voice.cancel();
      setResults([]);
      setPartialResults([]);
      accumulatedTextRef.current = '';
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to cancel recording';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError]);

  const reset = useCallback(() => {
    setResults([]);
    setPartialResults([]);
    setError(null);
    setIsRecording(false);
    accumulatedTextRef.current = '';
    shouldContinueRef.current = false;
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  return {
    isRecording,
    results,
    partialResults,
    error,
    start,
    stop,
    cancel,
    reset,
  };
};

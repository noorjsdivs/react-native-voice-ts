import { useEffect, useState, useCallback } from 'react';
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
    onResult,
    onError,
  } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [partialResults, setPartialResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up event listeners
    Voice.onSpeechStart = () => {
      setIsRecording(true);
      setError(null);
    };

    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      const errorMessage = e.error?.message || 'Unknown error';
      setError(errorMessage);
      setIsRecording(false);
      onError?.(errorMessage);
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0) {
        setResults(e.value);
        const firstResult = e.value[0];
        if (firstResult) {
          onResult?.(firstResult);
        }
      }
    };

    if (enablePartialResults) {
      Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
        if (e.value && e.value.length > 0) {
          setPartialResults(e.value);
        }
      };
    }

    // Cleanup
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [enablePartialResults, onResult, onError]);

  const start = useCallback(async () => {
    try {
      setError(null);
      setResults([]);
      setPartialResults([]);

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
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to start recording';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [locale, enablePartialResults, onError]);

  const stop = useCallback(async () => {
    try {
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
      await Voice.cancel();
      setResults([]);
      setPartialResults([]);
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

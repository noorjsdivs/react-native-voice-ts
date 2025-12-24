import React, { useEffect, useState, useCallback } from 'react';
import Voice from '../index';
import type { SpeechErrorEvent, SpeechResultsEvent } from '../VoiceModuleTypes';

export interface VoiceMicrophoneProps {
  /**
   * Callback fired when speech is recognized and converted to text
   */
  onSpeechResult?: (text: string) => void;

  /**
   * Callback fired when partial results are available (real-time)
   */
  onPartialResult?: (text: string) => void;

  /**
   * Callback fired when recording starts
   */
  onStart?: () => void;

  /**
   * Callback fired when recording stops
   */
  onStop?: () => void;

  /**
   * Callback fired when an error occurs
   */
  onError?: (error: string) => void;

  /**
   * Language locale for speech recognition
   * @default 'en-US'
   */
  locale?: string;

  /**
   * Whether to automatically start recording on mount
   * @default false
   */
  autoStart?: boolean;

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
   * Custom render function for the component
   * Receives isRecording state and control functions
   */
  children?: (props: {
    isRecording: boolean;
    recognizedText: string;
    partialText: string;
    start: () => Promise<void>;
    stop: () => Promise<void>;
    cancel: () => Promise<void>;
    error: string | null;
  }) => React.ReactNode;
}

/**
 * VoiceMicrophone Component
 *
 * A ready-to-use voice recognition component that handles microphone access,
 * speech recognition, and provides real-time text results.
 *
 * @example
 * ```tsx
 * // Simple usage with callback
 * <VoiceMicrophone
 *   onSpeechResult={(text) => setSearchQuery(text)}
 * />
 *
 * // Custom render with full control
 * <VoiceMicrophone locale="en-US">
 *   {({ isRecording, recognizedText, start, stop }) => (
 *     <View>
 *       <Text>{recognizedText}</Text>
 *       <Button
 *         onPress={isRecording ? stop : start}
 *         title={isRecording ? 'Stop' : 'Start'}
 *       />
 *     </View>
 *   )}
 * </VoiceMicrophone>
 * ```
 */
const VoiceMicrophone: React.FC<VoiceMicrophoneProps> = ({
  onSpeechResult,
  onPartialResult,
  onStart,
  onStop,
  onError,
  locale = 'en-US',
  autoStart = false,
  enablePartialResults = true,
  continuous = false,
  maxSilenceDuration = 5000,
  children,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [partialText, setPartialText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const shouldContinueRef = React.useRef(false);
  const silenceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

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
      onStart?.();
    };

    Voice.onSpeechEnd = async () => {
      setIsRecording(false);

      // In continuous mode, restart listening after results
      if (continuous && shouldContinueRef.current) {
        // Small delay before restarting
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
      } else {
        onStop?.();
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
        const text = e.value[0];

        // In continuous mode, append new text to existing
        if (continuous && recognizedText) {
          const updatedText = recognizedText + ' ' + text;
          setRecognizedText(updatedText);
          onSpeechResult?.(updatedText);
        } else {
          setRecognizedText(text);
          onSpeechResult?.(text);
        }

        setPartialText('');
      }
    };

    if (enablePartialResults) {
      Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
        if (e.value && e.value.length > 0) {
          const text = e.value[0];
          setPartialText(text);
          onPartialResult?.(text);

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
                onStop?.();
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
    onSpeechResult,
    onPartialResult,
    onStart,
    onStop,
    onError,
    enablePartialResults,
    continuous,
    recognizedText,
    locale,
    maxSilenceDuration,
  ]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const start = useCallback(async () => {
    try {
      setError(null);
      if (!continuous) {
        setRecognizedText('');
        setPartialText('');
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
            onStop?.();
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
  }, [
    locale,
    enablePartialResults,
    onError,
    continuous,
    maxSilenceDuration,
    onStop,
  ]);

  const stop = useCallback(async () => {
    try {
      shouldContinueRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      await Voice.stop();
      onStop?.();
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to stop recording';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError, onStop]);

  const cancel = useCallback(async () => {
    try {
      shouldContinueRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      await Voice.cancel();
      setRecognizedText('');
      setPartialText('');
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'Failed to cancel recording';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [onError]);

  // If children render prop is provided, use it
  if (children) {
    return (
      <>
        {children({
          isRecording,
          recognizedText,
          partialText,
          start,
          stop,
          cancel,
          error,
        })}
      </>
    );
  }

  // Default: render nothing (headless component)
  return null;
};

export default VoiceMicrophone;

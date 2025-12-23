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
  children,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [partialText, setPartialText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up event listeners
    Voice.onSpeechStart = () => {
      setIsRecording(true);
      setError(null);
      onStart?.();
    };

    Voice.onSpeechEnd = () => {
      setIsRecording(false);
      onStop?.();
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      const errorMessage = e.error?.message || 'Unknown error';
      setError(errorMessage);
      setIsRecording(false);
      onError?.(errorMessage);
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value && e.value.length > 0) {
        const text = e.value[0];
        setRecognizedText(text);
        onSpeechResult?.(text);
      }
    };

    if (enablePartialResults) {
      Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
        if (e.value && e.value.length > 0) {
          const text = e.value[0];
          setPartialText(text);
          onPartialResult?.(text);
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
      setRecognizedText('');
      setPartialText('');

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

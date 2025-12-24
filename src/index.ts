import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  PermissionsAndroid,
  type EventSubscription,
} from 'react-native';
import invariant from 'invariant';
import {
  type SpeechEvents,
  type TranscriptionEvents,
  type TranscriptionEndEvent,
  type TranscriptionErrorEvent,
  type TranscriptionStartEvent,
  type SpeechRecognizedEvent,
  type SpeechErrorEvent,
  type SpeechResultsEvent,
  type SpeechStartEvent,
  type SpeechEndEvent,
  type SpeechVolumeChangeEvent,
  type TranscriptionResultsEvent,
} from './VoiceModuleTypes';

const LINKING_ERROR =
  `The package 'react-native-voice-ts' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-ignore - turboModuleProxy is not in React Native types
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const VoiceNativeModule = isTurboModuleEnabled
  ? Platform.OS === 'android'
    ? require('./NativeVoiceAndroid').default
    : require('./NativeVoiceIOS').default
  : NativeModules.Voice;

const Voice = VoiceNativeModule
  ? VoiceNativeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

// NativeEventEmitter is only availabe on React Native platforms, so this conditional is used to avoid import conflicts in the browser/server
const voiceEmitter =
  Platform.OS !== 'web' ? new NativeEventEmitter(Voice) : null;
type SpeechEvent = keyof SpeechEvents;
type TranscriptionEvent = keyof TranscriptionEvents;

class RCTVoice {
  private _loaded: boolean;
  private _listeners: EventSubscription[];
  private _events: Required<SpeechEvents> & Required<TranscriptionEvents>;
  private _isRecognizing: boolean;
  private _debounceTimeout: NodeJS.Timeout | null;
  private _lastResults: string[];
  private _recognitionStartTime: number;

  constructor() {
    this._loaded = false;
    this._listeners = [];
    this._isRecognizing = false;
    this._debounceTimeout = null;
    this._lastResults = [];
    this._recognitionStartTime = 0;
    this._events = {
      onSpeechStart: () => {},
      onSpeechRecognized: () => {},
      onSpeechEnd: () => {},
      onSpeechError: () => {},
      onSpeechResults: () => {},
      onSpeechPartialResults: () => {},
      onSpeechVolumeChanged: () => {},
      onTranscriptionStart: () => {},
      onTranscriptionEnd: () => {},
      onTranscriptionError: () => {},
      onTranscriptionResults: () => {},
    };
  }

  removeAllListeners() {
    if (this._listeners && this._listeners.length > 0) {
      this._listeners.forEach((listener) => {
        if (listener?.remove) {
          listener.remove();
        }
      });
      this._listeners = [];
    }
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
      this._debounceTimeout = null;
    }
    this._isRecognizing = false;
    this._lastResults = [];
  }

  destroy() {
    if (!this._loaded && !this._listeners) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      Voice.destroySpeech((error: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          this.removeAllListeners();
          this._loaded = false;
          resolve();
        }
      });
    });
  }
  destroyTranscription() {
    if (!this._loaded && !this._listeners) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      Voice.destroyTranscription((error: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          if (this._listeners?.length > 0) {
            this._listeners.forEach((listener) => listener.remove());
            this._listeners = [];
          }
          this._loaded = false;
          resolve();
        }
      });
    });
  }

  start(locale: string, options = {}) {
    if (
      !this._loaded &&
      this._listeners.length === 0 &&
      voiceEmitter !== null
    ) {
      this._listeners = (Object.keys(this._events) as SpeechEvent[]).map(
        (key: SpeechEvent) => voiceEmitter.addListener(key, this._events[key]),
      );
    }

    this._recognitionStartTime = Date.now();
    this._isRecognizing = true;

    return new Promise<void>((resolve, reject) => {
      const callback = (error: string) => {
        if (error) {
          this._isRecognizing = false;
          this._recognitionStartTime = 0;
          reject(new Error(error));
        } else {
          resolve();
        }
      };
      if (Platform.OS === 'android') {
        Voice.startSpeech(
          locale,
          Object.assign(
            {
              EXTRA_LANGUAGE_MODEL: 'LANGUAGE_MODEL_FREE_FORM',
              EXTRA_MAX_RESULTS: 5,
              EXTRA_PARTIAL_RESULTS: true,
              REQUEST_PERMISSIONS_AUTO: true,
            },
            options,
          ),
          callback,
        );
      } else {
        Voice.startSpeech(locale, callback);
      }
    });
  }
  startTranscription(url: string, locale: string, options = {}) {
    if (!this._loaded && !this._listeners && voiceEmitter !== null) {
      this._listeners = (Object.keys(this._events) as TranscriptionEvent[]).map(
        (key: TranscriptionEvent) =>
          voiceEmitter.addListener(key, this._events[key]),
      );
    }

    return new Promise<void>((resolve, reject) => {
      const callback = (error: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve();
        }
      };
      if (Platform.OS === 'android') {
        Voice.startTranscription(
          url,
          locale,
          Object.assign(
            {
              EXTRA_LANGUAGE_MODEL: 'LANGUAGE_MODEL_FREE_FORM',
              EXTRA_MAX_RESULTS: 5,
              EXTRA_PARTIAL_RESULTS: true,
              REQUEST_PERMISSIONS_AUTO: true,
            },
            options,
          ),
          callback,
        );
      } else {
        Voice.startTranscription(url, locale, callback);
      }
    });
  }
  stop() {
    if (!this._loaded && !this._listeners) {
      return Promise.resolve();
    }
    this._isRecognizing = false;
    return new Promise<void>((resolve, reject) => {
      Voice.stopSpeech((error?: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve();
        }
      });
    });
  }
  stopTranscription() {
    if (!this._loaded && !this._listeners) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      Voice.stopTranscription((error?: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve();
        }
      });
    });
  }
  cancel() {
    if (!this._loaded && !this._listeners) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      Voice.cancelSpeech((error?: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve();
        }
      });
    });
  }
  cancelTranscription() {
    if (!this._loaded && !this._listeners) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      Voice.cancelSpeech((error?: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve();
        }
      });
    });
  }
  isAvailable(): Promise<0 | 1> {
    return new Promise((resolve, reject) => {
      Voice.isSpeechAvailable((isAvailable: 0 | 1, error: string) => {
        if (error) {
          reject(new Error(error));
        } else {
          resolve(isAvailable);
        }
      });
    });
  }

  /**
   * (Android) Get a list of the speech recognition engines available on the device
   * */
  getSpeechRecognitionServices() {
    if (Platform.OS !== 'android') {
      invariant(
        Voice,
        'Speech recognition services can be queried for only on Android',
      );
      return;
    }

    return Voice.getSpeechRecognitionServices();
  }

  isRecognizing(): Promise<0 | 1> {
    return new Promise((resolve) => {
      Voice.isRecognizing((isRecognizing: 0 | 1) => {
        this._isRecognizing = isRecognizing === 1;
        resolve(isRecognizing);
      });
    });
  }

  /**
   * Check if speech recognition is currently in progress (synchronous)
   */
  get recognizing(): boolean {
    return this._isRecognizing;
  }

  /**
   * Get the last recognition results without triggering a new recognition
   */
  getLastResults(): string[] {
    return [...this._lastResults];
  }

  /**
   * Get recognition duration in milliseconds
   */
  getRecognitionDuration(): number {
    if (this._recognitionStartTime === 0) return 0;
    return Date.now() - this._recognitionStartTime;
  }

  /**
   * Request microphone permission (Android)
   */
  async requestMicrophonePermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true; // iOS handles permissions automatically
    }

    try {
      const permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
      if (!permission) {
        return false;
      }
      const granted = await PermissionsAndroid.request(permission, {
        title: 'Microphone Permission',
        message:
          'This app needs access to your microphone for voice recognition',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Error requesting microphone permission:', err);
      return false;
    }
  }

  /**
   * Check microphone permission status (Android)
   */
  async checkMicrophonePermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
      if (!permission) {
        return false;
      }
      const granted = await PermissionsAndroid.check(permission);
      return granted;
    } catch (err) {
      console.warn('Error checking microphone permission:', err);
      return false;
    }
  }

  /**
   * Get supported languages for speech recognition
   */
  async getSupportedLanguages(): Promise<string[]> {
    try {
      if (Platform.OS === 'android') {
        // Android implementation would need native support
        return [];
      }
      // iOS implementation would need native support
      return [];
    } catch (error) {
      console.warn('Error getting supported languages:', error);
      return [];
    }
  }

  /**
   * Debounce results to avoid excessive updates
   * Reserved for future use
   * @private
   */
  private debounceResults(
    callback: (results: string[]) => void,
    results: string[],
    delay: number = 300,
  ): void {
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
    this._debounceTimeout = setTimeout(() => {
      callback(results);
      this._debounceTimeout = null;
    }, delay);
  }

  set onSpeechStart(fn: (e: SpeechStartEvent) => void) {
    this._events.onSpeechStart = (e: SpeechStartEvent) => {
      this._recognitionStartTime = Date.now();
      this._isRecognizing = true;
      fn(e);
    };
  }

  set onTranscriptionStart(fn: (e: TranscriptionStartEvent) => void) {
    this._events.onTranscriptionStart = fn;
  }

  set onSpeechRecognized(fn: (e: SpeechRecognizedEvent) => void) {
    this._events.onSpeechRecognized = fn;
  }

  set onSpeechEnd(fn: (e: SpeechEndEvent) => void) {
    this._events.onSpeechEnd = (e: SpeechEndEvent) => {
      this._isRecognizing = false;
      fn(e);
    };
  }

  set onTranscriptionEnd(fn: (e: SpeechEndEvent) => void) {
    this._events.onTranscriptionEnd = fn;
  }
  set onSpeechError(fn: (e: SpeechErrorEvent) => void) {
    this._events.onSpeechError = (e: SpeechErrorEvent) => {
      this._isRecognizing = false;
      fn(e);
    };
  }

  set onTranscriptionError(fn: (e: TranscriptionErrorEvent) => void) {
    this._events.onTranscriptionError = fn;
  }

  set onSpeechResults(fn: (e: SpeechResultsEvent) => void) {
    this._events.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        this._lastResults = e.value;
      }
      this._isRecognizing = false;
      fn(e);
    };
  }

  set onTranscriptionResults(fn: (e: TranscriptionResultsEvent) => void) {
    this._events.onTranscriptionResults = fn;
  }

  set onSpeechPartialResults(fn: (e: SpeechResultsEvent) => void) {
    this._events.onSpeechPartialResults = fn;
  }
  set onSpeechVolumeChanged(fn: (e: SpeechVolumeChangeEvent) => void) {
    this._events.onSpeechVolumeChanged = fn;
  }
}

export type {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechEvents,
  SpeechStartEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechVolumeChangeEvent,
  TranscriptionEndEvent,
  TranscriptionErrorEvent,
  TranscriptionEvents,
  TranscriptionStartEvent,
  TranscriptionResultsEvent,
};

export type {
  VoiceOptions,
  RecognitionStats,
  PermissionResult,
  Language,
} from './VoiceUtilTypes';

// Export components
export {
  VoiceMicrophone,
  MicIcon,
  MicOffIcon,
  MicIconFilled,
  MicOffIconFilled,
  MicIconWave,
  MicOffIconWave,
} from './components';
export type {
  VoiceMicrophoneProps,
  MicIconProps,
  MicOffIconProps,
} from './components';

// Export hooks
export { useVoiceRecognition } from './hooks';
export type {
  UseVoiceRecognitionOptions,
  UseVoiceRecognitionReturn,
} from './hooks';

export default new RCTVoice();

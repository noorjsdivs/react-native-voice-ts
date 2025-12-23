<div align="center">
  
# 🎤 React Native Voice (TypeScript)

### Advanced Speech-to-Text Library for React Native

[![npm version](https://img.shields.io/npm/v/react-native-voice-ts.svg)](https://www.npmjs.com/package/react-native-voice-ts)
[![npm downloads](https://img.shields.io/npm/dm/react-native-voice-ts.svg)](https://www.npmjs.com/package/react-native-voice-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/noorjsdivs/react-native-voice-ts/pulls)

A powerful, production-ready speech-to-text library for React Native applications with full TypeScript support, built-in performance optimizations, and comprehensive features.

[Features](#-features) •
[Installation](#-installation) •
[Quick Start](#-quick-start) •
[API Reference](#-api-reference) •
[Examples](#-complete-examples) •
[Contributing](#-contributing)

</div>

---

## ✨ Features

### Core Capabilities

- 🎯 **Real-time Speech Recognition** - Live speech-to-text conversion
- 🔄 **Partial Results** - Get intermediate results as the user speaks
- 📊 **Volume Monitoring** - Track audio input levels in real-time
- 🌍 **Multi-language Support** - Support for 100+ languages
- ⚡ **Performance Optimized** - Built with performance best practices
- 📱 **Cross-platform** - Works on both iOS and Android
- 🔒 **Type-safe** - Full TypeScript support with comprehensive types

### Enhanced Features (2025 Update)

- ✅ **Permission Management** - Easy microphone permission handling
- 📈 **Performance Tracking** - Monitor recognition duration and state
- 💾 **Result Caching** - Access last results without re-recognition
- 🎨 **Modern API** - Clean, intuitive API design
- 🛡️ **Error Handling** - Comprehensive error management
- 🔧 **Fully Customizable** - Extensive configuration options

### Platform Support

| Feature               | iOS | Android |
| --------------------- | :-: | :-----: |
| Speech Recognition    | ✅  |   ✅    |
| Partial Results       | ✅  |   ✅    |
| Volume Events         | ✅  |   ✅    |
| Permission Management | N/A |   ✅    |
| Audio Transcription   | ✅  |   ❌    |
| Recognition Services  | ❌  |   ✅    |

---

## 📦 Installation

### Using npm

```bash
npm install react-native-voice-ts --save
```

### Using yarn

```bash
yarn add react-native-voice-ts
```

### iOS Setup

```bash
cd ios && pod install && cd ..
```

### Permissions

#### iOS (Info.plist)

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to your microphone for voice recognition</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app needs speech recognition permission to convert your speech to text</string>
```

#### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

---

## 🚀 Quick Start

### Basic Usage

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    // Set up event listeners
    Voice.onSpeechResults = (e) => {
      setRecognizedText(e.value[0]);
    };

    // Cleanup
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{recognizedText || 'Press to speak'}</Text>
      <TouchableOpacity
        style={[styles.button, isRecording && styles.recording]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? '🔴 Stop' : '🎤 Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
```

---

## 📚 API Reference

### Methods

#### Core Methods

##### `start(locale: string, options?: VoiceOptions): Promise<void>`

Start voice recognition.

```typescript
// Basic usage
await Voice.start('en-US');

// With options (Android)
await Voice.start('en-US', {
  EXTRA_LANGUAGE_MODEL: 'LANGUAGE_MODEL_FREE_FORM',
  EXTRA_MAX_RESULTS: 5,
  EXTRA_PARTIAL_RESULTS: true,
  REQUEST_PERMISSIONS_AUTO: true,
});
```

**Supported Languages**: `en-US`, `es-ES`, `fr-FR`, `de-DE`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR`, `ru-RU`, `zh-CN`, and 100+ more.

##### `stop(): Promise<void>`

Stop voice recognition and get final results.

```typescript
await Voice.stop();
```

##### `cancel(): Promise<void>`

Cancel voice recognition without getting results.

```typescript
await Voice.cancel();
```

##### `destroy(): Promise<void>`

Destroy the voice recognition instance and cleanup.

```typescript
await Voice.destroy();
```

##### `removeAllListeners(): void`

Remove all event listeners.

```typescript
Voice.removeAllListeners();
```

#### Status Methods

##### `isAvailable(): Promise<0 | 1>`

Check if speech recognition is available on the device.

```typescript
const available = await Voice.isAvailable();
if (available) {
  console.log('Speech recognition is available');
}
```

##### `isRecognizing(): Promise<0 | 1>`

Check if currently recognizing (async).

```typescript
const recognizing = await Voice.isRecognizing();
```

##### `recognizing: boolean` (getter)

Check if currently recognizing (synchronous).

```typescript
if (Voice.recognizing) {
  console.log('Currently recording');
}
```

#### New Features (2025)

##### `requestMicrophonePermission(): Promise<boolean>`

Request microphone permission (Android only).

```typescript
const granted = await Voice.requestMicrophonePermission();
if (granted) {
  await Voice.start('en-US');
}
```

##### `checkMicrophonePermission(): Promise<boolean>`

Check microphone permission status (Android only).

```typescript
const hasPermission = await Voice.checkMicrophonePermission();
```

##### `getRecognitionDuration(): number`

Get the duration of current recognition session in milliseconds.

```typescript
const duration = Voice.getRecognitionDuration();
console.log(`Recording for ${duration}ms`);
```

##### `getLastResults(): string[]`

Get the last recognized results without triggering new recognition.

```typescript
const lastResults = Voice.getLastResults();
console.log('Last results:', lastResults);
```

#### Android-Only Methods

##### `getSpeechRecognitionServices(): Promise<string[]>`

Get available speech recognition engines on Android.

```typescript
if (Platform.OS === 'android') {
  const services = await Voice.getSpeechRecognitionServices();
  console.log('Available services:', services);
}
```

### Events

Set up event listeners to handle voice recognition events:

#### `onSpeechStart`

Triggered when speech recognition starts.

```typescript
Voice.onSpeechStart = (e: SpeechStartEvent) => {
  console.log('Speech recognition started');
};
```

#### `onSpeechRecognized`

Triggered when speech is recognized.

```typescript
Voice.onSpeechRecognized = (e: SpeechRecognizedEvent) => {
  console.log('Speech recognized');
};
```

#### `onSpeechEnd`

Triggered when speech recognition ends.

```typescript
Voice.onSpeechEnd = (e: SpeechEndEvent) => {
  console.log('Speech recognition ended');
};
```

#### `onSpeechError`

Triggered when an error occurs.

```typescript
Voice.onSpeechError = (e: SpeechErrorEvent) => {
  console.error('Error:', e.error?.message);
};
```

#### `onSpeechResults`

Triggered when final results are available.

```typescript
Voice.onSpeechResults = (e: SpeechResultsEvent) => {
  console.log('Results:', e.value);
  // e.value is an array of strings, sorted by confidence
};
```

#### `onSpeechPartialResults`

Triggered when partial results are available (real-time).

```typescript
Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
  console.log('Partial results:', e.value);
};
```

#### `onSpeechVolumeChanged`

Triggered when the audio volume changes.

```typescript
Voice.onSpeechVolumeChanged = (e: SpeechVolumeChangeEvent) => {
  console.log('Volume:', e.value); // 0-10
};
```

### Types

```typescript
import type {
  SpeechEvents,
  SpeechStartEvent,
  SpeechEndEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechVolumeChangeEvent,
  VoiceOptions,
  RecognitionStats,
  PermissionResult,
  Language,
} from 'react-native-voice-ts';
```

---

## 💡 Complete Examples

For comprehensive examples including:

- Simple Voice-to-Text
- Real-time Transcription with Partial Results
- Multi-language Support
- Voice Commands
- Permission Handling
- Custom Hooks

Please refer to the [example](./example) directory in this repository.

### Quick Example: Custom Hook

```typescript
import { useEffect, useState, useCallback } from 'react';
import Voice from '@react-native-voice/voice';

export const useVoiceRecognition = (locale = 'en-US') => {
  const [isRecording, setIsRecording] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = (e) => setResults(e.value || []);
    Voice.onSpeechError = (e) => setError(e.error?.message || 'Error');

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const start = useCallback(async () => {
    try {
      await Voice.start(locale);
    } catch (e) {
      setError('Failed to start');
    }
  }, [locale]);

  const stop = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (e) {
      setError('Failed to stop');
    }
  }, []);

  return { isRecording, results, error, start, stop };
};
```

---

## ⚠️ Common Issues & Solutions

### Issue: No speech detected

**Solution**: Check microphone permissions and ensure the device is not muted.

### Issue: Error on iOS Simulator

**Solution**: Speech recognition doesn't work on iOS Simulator. Use a real device.

### Issue: Partial results not working

**Solution**: Ensure `EXTRA_PARTIAL_RESULTS: true` is set on Android.

### Issue: App crashes on Android

**Solution**: Make sure RECORD_AUDIO permission is declared in AndroidManifest.xml.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/noorjsdivs/react-native-voice-ts.git
cd react-native-voice-ts

# Install dependencies
yarn install

# Build
yarn build

# Run example
cd example
yarn install
yarn ios # or yarn android
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Noor Mohammad

---

## 👤 Author

**Noor Mohammad**

- GitHub: [@noorjsdivs](https://github.com/noorjsdivs)
- Email: noor.jsdivs@gmail.com

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this library
- Inspired by the need for better voice recognition in React Native apps
- Built with ❤️ for the React Native community

---

## 📊 Stats

![npm](https://img.shields.io/npm/v/react-native-voice-ts)
![downloads](https://img.shields.io/npm/dm/react-native-voice-ts)
![license](https://img.shields.io/npm/l/react-native-voice-ts)
![issues](https://img.shields.io/github/issues/noorjsdivs/react-native-voice-ts)
![stars](https://img.shields.io/github/stars/noorjsdivs/react-native-voice-ts)

---

<div align="center">
  <strong>⭐ Star this repo if you find it helpful! ⭐</strong>
  <br />
  <br />
  Made with ❤️ by <a href="https://github.com/noorjsdivs">Noor Mohammad</a>
</div>

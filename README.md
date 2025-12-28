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
[Component Usage](#-component--hook-usage) •
[API Reference](#-api-reference) •
[Examples](#-complete-examples) •
[Contributing](#-contributing)

</div>

---

### ✨ Features

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
- 🎪 **Ready-to-use Components** - VoiceMicrophone component & useVoiceRecognition hook
- 🔌 **Plug & Play** - Import and use instantly in any React Native app
- 🎯 **SVG Icons Included** - Beautiful Lucide-based mic icons (MicIcon, MicOffIcon)

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

### Using pnpm

```bash
pnpm add react-native-voice-ts
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

### 📱 Compatibility

**React Native Versions**: 0.71.0 and above

| React Native | iOS      | Android    | Status        |
| ------------ | -------- | ---------- | ------------- |
| 0.76.x       | ✅ 13.4+ | ✅ API 24+ | Full Support  |
| 0.75.x       | ✅ 13.4+ | ✅ API 24+ | Full Support  |
| 0.74.x       | ✅ 13.4+ | ✅ API 24+ | Full Support  |
| 0.73.x       | ✅ 13.4+ | ✅ API 24+ | Full Support  |
| 0.72.x       | ✅ 13.4+ | ✅ API 24+ | Full Support  |
| 0.71.x       | ✅ 13.4+ | ✅ API 24+ | Full Support  |
| < 0.71       | ❌       | ❌         | Not Supported |

**Architecture Support**:

- ✅ Old Architecture (Bridge) - Fully Supported
- ✅ New Architecture (Turbo Modules & Fabric) - Fully Supported
- ✅ Expo Projects (48.0.0+) - Supported with config plugin

**Platform Requirements**:

- **iOS**: 13.4 or higher
- **Android**: API Level 24 (Android 7.0) or higher
- **Node.js**: 18.0.0 or higher

For detailed compatibility information and migration guides, see [COMPATIBILITY.md](./COMPATIBILITY.md).

---

## 🚀 Quick Start

### Three Ways to Use

```typescript
// 1. Ready-to-use Component (Easiest - New in 2025)
import { VoiceMicrophone } from 'react-native-voice-ts';

// 2. Custom Hook (More control - New in 2025)
import { useVoiceRecognition } from 'react-native-voice-ts';

// 3. Core API (Advanced - Fully backward compatible)
import Voice from 'react-native-voice-ts';

// 4. Import SVG Icons (Optional - for custom UI)
import { MicIcon, MicOffIcon } from 'react-native-voice-ts';
```

**Note:** To use SVG icons, install `react-native-svg`:

```bash
npm install react-native-svg
# or
yarn add react-native-svg
```

---

### ⚡ Super Simple - Just Import and Use!

**Example 1: Voice Search (Minimal Code)**

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

export default function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Type or speak..."
      />

      <VoiceMicrophone onSpeechResult={setSearchText}>
        {({ isRecording, start, stop }) => (
          <Button
            onPress={isRecording ? stop : start}
            title={isRecording ? '⏹ Stop' : '🎤 Speak'}
          />
        )}
      </VoiceMicrophone>
    </View>
  );
}
```

**Example 2: With Custom Styling & SVG Icons**

```tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { VoiceMicrophone, MicIcon, MicOffIcon } from 'react-native-voice-ts';

export default function App() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Search..."
      />

      <VoiceMicrophone onSpeechResult={setText}>
        {({ isRecording, start, stop }) => (
          <TouchableOpacity
            style={[styles.mic, isRecording && styles.recording]}
            onPress={isRecording ? stop : start}
          >
            {isRecording ? (
              <MicOffIcon size={24} color="#fff" />
            ) : (
              <MicIcon size={24} color="#fff" />
            )}
          </TouchableOpacity>
        )}
      </VoiceMicrophone>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 20 },
  input: { flex: 1, borderWidth: 1, padding: 10, marginRight: 10 },
  mic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: { backgroundColor: '#FF3B30' },
});
```

---

## 🎨 Built-in Icon Variants

The library includes **3 microphone icon variants**, each with on/off states (6 icons total):

### **Variant 1: Standard Outline** (Default)

Classic microphone with clean outline design.

```tsx
import { MicIcon, MicOffIcon } from 'react-native-voice-ts';

// Active state
<MicIcon size={24} color="#007AFF" strokeWidth={2} />

// Muted/Off state
<MicOffIcon size={24} color="#FF3B30" strokeWidth={2} />
```

**SVG Preview:**

<div style="display: flex; gap: 40px; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 8px;">
  <div style="text-align: center;">
    <div><strong>Active</strong></div>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
    </svg>
  </div>
  <div style="text-align: center;">
    <div><strong>Muted</strong></div>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="2" y1="2" x2="22" y2="22"/>
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/>
      <path d="M5 10v2a7 7 0 0 0 12 5"/>
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
    </svg>
  </div>
</div>

### **Variant 2: Filled Microphone**

Bold filled microphone for emphasis and better visibility.

```tsx
import { MicIconFilled, MicOffIconFilled } from 'react-native-voice-ts';

// Active filled state
<MicIconFilled size={24} color="#007AFF" strokeWidth={2} />

// Muted filled state
<MicOffIconFilled size={24} color="#FF3B30" strokeWidth={2} />
```

**SVG Preview:**

```
Active:  ⎪█⎥  (Solid filled microphone)
Muted:   ⎪/█⎥ (Filled microphone with mute indicator)
```

<div style="display: flex; gap: 40px; align-items: center; padding: 20px; background: #f5f5f5; border-radius: 8px;">
  <div style="text-align: center;">
    <div><strong>Active</strong></div>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <path d="M20 7v10" opacity="0.5"/>
      <path d="M23 9v6" opacity="0.3"/>
      <path d="M4 7v10" opacity="0.5"/>
      <path d="M1 9v6" opacity="0.3"/>
    </svg>
  </div>
  <div style="text-align: center;">
    <div><strong>Muted</strong></div>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="2" y1="2" x2="22" y2="22" stroke="#FF3B30"/>
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"/>
      <path d="M5 10v2a7 7 0 0 0 12 5"/>
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <path d="M20 7v4" opacity="0.2" stroke-dasharray="2,2"/>
      <path d="M4 7v4" opacity="0.2" stroke-dasharray="2,2"/>
    </svg>
  </div>
</div>

### **Variant 3: Microphone with Sound Waves**

Dynamic microphone with sound wave indicators - perfect for showing active recording.

```tsx
import { MicIconWave, MicOffIconWave } from 'react-native-voice-ts';

// Active with waves
<MicIconWave size={24} color="#007AFF" strokeWidth={2} />

// Muted with disabled waves
<MicOffIconWave size={24} color="#999" strokeWidth={2} />
```

**SVG Preview:**

```
Active:  ⎟⎪ ⎥⎟  (Microphone with animated sound waves)
Muted:   ⎟⎪/⎥⎟ (Microphone with muted/dashed waves)
```

### **Complete Icon Usage Example**

```tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  VoiceMicrophone,
  MicIcon,
  MicOffIcon,
  MicIconFilled,
  MicOffIconFilled,
  MicIconWave,
  MicOffIconWave,
} from 'react-native-voice-ts';

export default function IconVariantsDemo() {
  const [variant, setVariant] = useState<'standard' | 'filled' | 'wave'>(
    'standard',
  );

  const getIcons = () => {
    switch (variant) {
      case 'filled':
        return { ActiveIcon: MicIconFilled, MutedIcon: MicOffIconFilled };
      case 'wave':
        return { ActiveIcon: MicIconWave, MutedIcon: MicOffIconWave };
      default:
        return { ActiveIcon: MicIcon, MutedIcon: MicOffIcon };
    }
  };

  const { ActiveIcon, MutedIcon } = getIcons();

  return (
    <View style={styles.container}>
      {/* Icon Variant Selector */}
      <View style={styles.selector}>
        <TouchableOpacity onPress={() => setVariant('standard')}>
          <Text style={variant === 'standard' && styles.active}>Standard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVariant('filled')}>
          <Text style={variant === 'filled' && styles.active}>Filled</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVariant('wave')}>
          <Text style={variant === 'wave' && styles.active}>Wave</Text>
        </TouchableOpacity>
      </View>

      {/* Voice Input with Selected Icon */}
      <VoiceMicrophone>
        {({ isRecording, start, stop }) => (
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.recording]}
            onPress={isRecording ? stop : start}
          >
            {isRecording ? (
              <MutedIcon size={32} color="#fff" strokeWidth={2} />
            ) : (
              <ActiveIcon size={32} color="#fff" strokeWidth={2} />
            )}
          </TouchableOpacity>
        )}
      </VoiceMicrophone>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  selector: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  active: { fontWeight: 'bold', color: '#007AFF' },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recording: { backgroundColor: '#FF3B30' },
});
```

### **Icon Props**

All icons accept the same props:

| Prop          | Type     | Default          | Description                  |
| ------------- | -------- | ---------------- | ---------------------------- |
| `size`        | `number` | `24`             | Icon size in pixels          |
| `color`       | `string` | `'currentColor'` | Icon color (any valid color) |
| `strokeWidth` | `number` | `2`              | Stroke width for outlines    |

---

### 🎯 Using Hook (For More Control)

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useVoiceRecognition } from 'react-native-voice-ts';

export default function App() {
  const { isRecording, results, start, stop } = useVoiceRecognition({
    onResult: (text) => console.log('You said:', text),
  });

  return (
    <View style={{ padding: 20 }}>
      <Text>{results[0] || 'Press to speak'}</Text>
      <Button
        onPress={isRecording ? stop : start}
        title={isRecording ? 'Stop' : 'Start'}
      />
    </View>
  );
}
```

---

### 🔧 Advanced (Core API)

For users who want full control or are migrating from previous versions:

```tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from 'react-native-voice-ts';

export default function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = (e) => setText(e.value[0]);
    return () => Voice.destroy().then(Voice.removeAllListeners);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>{text}</Text>
      <Button onPress={() => Voice.start('en-US')} title="Start" />
      <Button onPress={() => Voice.stop()} title="Stop" />
    </View>
  );
}
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

### Components

#### VoiceMicrophone

A ready-to-use React component that handles all voice recognition logic.

**Props:**

| Prop                   | Type                      | Default   | Description                                           |
| ---------------------- | ------------------------- | --------- | ----------------------------------------------------- |
| `onSpeechResult`       | `(text: string) => void`  | -         | Callback when final speech result is available        |
| `onPartialResult`      | `(text: string) => void`  | -         | Callback when partial (real-time) result is available |
| `onStart`              | `() => void`              | -         | Callback when recording starts                        |
| `onStop`               | `() => void`              | -         | Callback when recording stops                         |
| `onError`              | `(error: string) => void` | -         | Callback when an error occurs                         |
| `locale`               | `string`                  | `'en-US'` | Language locale for recognition                       |
| `autoStart`            | `boolean`                 | `false`   | Auto-start recording on mount                         |
| `enablePartialResults` | `boolean`                 | `true`    | Enable real-time partial results                      |
| `children`             | `function`                | -         | Render prop function                                  |

**Children Render Props:**

```typescript
{
  isRecording: boolean; // Whether recording is active
  recognizedText: string; // Final recognized text
  partialText: string; // Real-time partial text
  start: () => Promise<void>; // Start recording
  stop: () => Promise<void>; // Stop recording
  cancel: () => Promise<void>; // Cancel recording
  error: string | null; // Error message if any
}
```

**Example:**

```typescript
<VoiceMicrophone
  locale="en-US"
  onSpeechResult={(text) => console.log(text)}
>
  {({ isRecording, start, stop }) => (
    <Button onPress={isRecording ? stop : start} />
  )}
</VoiceMicrophone>
```

### Hooks

#### useVoiceRecognition

A custom hook that provides voice recognition functionality.

**Options:**

| Option                 | Type                      | Default   | Description            |
| ---------------------- | ------------------------- | --------- | ---------------------- |
| `locale`               | `string`                  | `'en-US'` | Language locale        |
| `enablePartialResults` | `boolean`                 | `true`    | Enable partial results |
| `onResult`             | `(text: string) => void`  | -         | Result callback        |
| `onError`              | `(error: string) => void` | -         | Error callback         |

**Returns:**

```typescript
{
  isRecording: boolean;
  results: string[];
  partialResults: string[];
  error: string | null;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  cancel: () => Promise<void>;
  reset: () => void;
}
```

**Example:**

```typescript
const { isRecording, results, start, stop } = useVoiceRecognition({
  locale: 'en-US',
  onResult: (text) => setSearchQuery(text),
});
```

---

### Core API Methods

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

## 💡 More Examples

### Example 1: Simple Voice Search

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

function VoiceSearch() {
  const [query, setQuery] = useState('');

  return (
    <View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search..."
      />
      <VoiceMicrophone onSpeechResult={setQuery}>
        {({ isRecording, start, stop }) => (
          <Button onPress={isRecording ? stop : start} title="🎤" />
        )}
      </VoiceMicrophone>
    </View>
  );
}
```

### Example 2: Real-time Transcription

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

function LiveTranscription() {
  const [text, setText] = useState('');

  return (
    <View>
      <VoiceMicrophone
        enablePartialResults
        onSpeechResult={setText}
        onPartialResult={(live) => console.log('Live:', live)}
      >
        {({ isRecording, partialText, start, stop }) => (
          <>
            <Text>{isRecording ? partialText : text}</Text>
            <Button
              onPress={isRecording ? stop : start}
              title={isRecording ? 'Stop' : 'Start'}
            />
          </>
        )}
      </VoiceMicrophone>
    </View>
  );
}
```

### Example 3: Multi-Language

```tsx
import React, { useState } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

function MultiLanguage() {
  const [lang, setLang] = useState('en-US');
  const [text, setText] = useState('');

  return (
    <View>
      <Picker selectedValue={lang} onValueChange={setLang}>
        <Picker.Item label="English" value="en-US" />
        <Picker.Item label="Spanish" value="es-ES" />
        <Picker.Item label="French" value="fr-FR" />
      </Picker>

      <Text>{text}</Text>

      <VoiceMicrophone locale={lang} onSpeechResult={setText}>
        {({ isRecording, start, stop }) => (
          <Button onPress={isRecording ? stop : start} title="Speak" />
        )}
      </VoiceMicrophone>
    </View>
  );
}
```

### Example 4: Voice Form

```tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

function VoiceForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(null);

  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <VoiceMicrophone onSpeechResult={setName}>
        {({ isRecording, start, stop }) => (
          <Button onPress={isRecording ? stop : start} title="🎤" />
        )}
      </VoiceMicrophone>

      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <VoiceMicrophone onSpeechResult={setEmail}>
        {({ isRecording, start, stop }) => (
          <Button onPress={isRecording ? stop : start} title="🎤" />
        )}
      </VoiceMicrophone>
    </View>
  );
}
```

### Example 5: Using the Hook

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useVoiceRecognition } from 'react-native-voice-ts';

function HookExample() {
  const { isRecording, results, partialResults, start, stop, reset } =
    useVoiceRecognition({
      locale: 'en-US',
      onResult: (text) => console.log(text),
    });

  return (
    <View>
      <Text>{isRecording ? partialResults[0] : results[0]}</Text>
      <Button
        onPress={isRecording ? stop : start}
        title={isRecording ? 'Stop' : 'Start'}
      />
      <Button onPress={reset} title="Clear" />
    </View>
  );
}
```

**More examples in the repo:**

- [VoiceSearchExample.tsx](./example/src/VoiceSearchExample.tsx) - Full search bar implementation
- [VoiceHookExample.tsx](./example/src/VoiceHookExample.tsx) - Hook usage with advanced features
- [COMPONENT_USAGE.md](./COMPONENT_USAGE.md) - Comprehensive component guide

---

## 💡 More Examples

### Example 1: Simple Voice Search

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

const MultiLanguageVoice = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [text, setText] = useState('');

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi-language Voice Input</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.langScroll}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.langButton,
              selectedLanguage === lang.code && styles.selectedLang,
            ]}
            onPress={() => setSelectedLanguage(lang.code)}
          >
            <Text style={styles.flag}>{lang.flag}</Text>
            <Text style={styles.langName}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{text || 'Select language and speak...'}</Text>
      </View>

      <VoiceMicrophone
        locale={selectedLanguage}
        onSpeechResult={setText}
      >
        {({ isRecording, start, stop }) => (
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.recording]}
            onPress={isRecording ? stop : start}
          >
            <Text style={styles.micIcon}>{isRecording ? '⏹' : '🎤'}</Text>
            <Text style={styles.micText}>
              {isRecording ? 'Stop' : 'Start Recording'}
            </Text>
          </TouchableOpacity>
        )}
      </VoiceMicrophone>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  langScroll: {
    marginBottom: 20,
  },
  langButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    minWidth: 100,
  },
  selectedLang: {
    backgroundColor: '#007AFF',
  },
  flag: {
    fontSize: 30,
    marginBottom: 5,
  },
  langName: {
    fontSize: 12,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
  micButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  micIcon: {
    fontSize: 40,
  },
  micText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### Example 4: Using Custom Hook with Form Input

```typescript
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useVoiceRecognition } from 'react-native-voice-ts';

const VoiceForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [activeField, setActiveField] = useState<'name' | 'message' | null>(null);

  const { isRecording, results, start, stop } = useVoiceRecognition({
    locale: 'en-US',
    onResult: (text) => {
      if (activeField === 'name') {
        setName(text);
      } else if (activeField === 'message') {
        setMessage(text);
      }
      setActiveField(null);
    },
  });

  const startRecordingForField = (field: 'name' | 'message') => {
    setActiveField(field);
    start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Form</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <TouchableOpacity
            style={[
              styles.micBtn,
              isRecording && activeField === 'name' && styles.recording,
            ]}
            onPress={() =>
              isRecording ? stop() : startRecordingForField('name')
            }
          >
            <Text>🎤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Message:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            placeholder="Your message"
            multiline
          />
          <TouchableOpacity
            style={[
              styles.micBtn,
              isRecording && activeField === 'message' && styles.recording,
            ]}
            onPress={() =>
              isRecording ? stop() : startRecordingForField('message')
            }
          >
            <Text>🎤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.log({ name, message })}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  micBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  submitButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Example 5: Voice Commands (Advanced)

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { VoiceMicrophone } from 'react-native-voice-ts';

const VoiceCommands = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    if (command) {
      handleCommand(command);
    }
  }, [command]);

  const handleCommand = (text: string) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('hello') || lowerText.includes('hi')) {
      addToHistory('👋 Hello there!');
    } else if (lowerText.includes('time')) {
      addToHistory(`🕒 Current time: ${new Date().toLocaleTimeString()}`);
    } else if (lowerText.includes('date')) {
      addToHistory(`📅 Today's date: ${new Date().toLocaleDateString()}`);
    } else if (lowerText.includes('clear')) {
      setHistory([]);
    } else {
      addToHistory(`❓ Unknown command: "${text}"`);
    }
  };

  const addToHistory = (message: string) => {
    setHistory((prev) => [message, ...prev]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Commands</Text>
      <Text style={styles.subtitle}>
        Try: "Hello", "What time is it?", "What's the date?", "Clear"
      </Text>

      <VoiceMicrophone
        onSpeechResult={setCommand}
        autoStart={false}
      >
        {({ isRecording, recognizedText, start, stop }) => (
          <View style={styles.controlPanel}>
            <TouchableOpacity
              style={[styles.button, isRecording && styles.recording]}
              onPress={isRecording ? stop : start}
            >
              <Text style={styles.buttonText}>
                {isRecording ? '🔴 Listening...' : '🎤 Speak Command'}
              </Text>
            </TouchableOpacity>
            {recognizedText && (
              <Text style={styles.recognizedText}>"{recognizedText}"</Text>
            )}
          </View>
        )}
      </VoiceMicrophone>

      <FlatList
        data={history}
        style={styles.list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No commands yet...</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  controlPanel: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recognizedText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  list: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
});
```

**More examples in the repo:**

- [VoiceSearchExample.tsx](./example/src/VoiceSearchExample.tsx) - Full search bar implementation
- [VoiceHookExample.tsx](./example/src/VoiceHookExample.tsx) - Hook usage with advanced features
- [COMPONENT_USAGE.md](./COMPONENT_USAGE.md) - Comprehensive component guide

---

## 📦 Component & Hook Usage

### Quick Links

- **[Complete Component Usage Guide](./COMPONENT_USAGE.md)** - Comprehensive guide with real-world examples
- **[VoiceSearchExample](./example/src/VoiceSearchExample.tsx)** - Working search bar example
- **[VoiceHookExample](./example/src/VoiceHookExample.tsx)** - Working hook usage example

### Component Benefits

✅ **No boilerplate** - Works out of the box  
✅ **Automatic cleanup** - Handles all event listeners  
✅ **Permission handling** - Built-in permission checks  
✅ **Type-safe** - Full TypeScript support  
✅ **Customizable** - Use your own UI with render props

---

## 🔄 Backward Compatibility

**This library is fully backward compatible!** If you're upgrading from a previous version or the original `@react-native-voice/voice`, all your existing code will continue to work without any changes.

### Core API (Always Supported)

The core Voice API remains unchanged and fully supported:

```tsx
import Voice from 'react-native-voice-ts';

// All these work exactly as before
Voice.start('en-US');
Voice.stop();
Voice.cancel();
Voice.destroy();
Voice.isAvailable();
Voice.onSpeechResults = (e) => console.log(e.value);
```

### What's New in v1.0+

The new features are **additions** that don't break existing code:

```tsx
// ✅ NEW: Component (optional to use)
import { VoiceMicrophone } from 'react-native-voice-ts';

// ✅ NEW: Hook (optional to use)
import { useVoiceRecognition } from 'react-native-voice-ts';

// ✅ NEW: Icons (optional to use)
import { MicIcon, MicOffIcon } from 'react-native-voice-ts';

// ✅ Still works: Original API
import Voice from 'react-native-voice-ts';
```

### Migration Guide

**No migration needed!** But if you want to use the new features:

```tsx
// Before (still works)
import Voice from 'react-native-voice-ts';
Voice.onSpeechResults = (e) => setText(e.value[0]);
Voice.start('en-US');

// After (optional upgrade)
import { useVoiceRecognition } from 'react-native-voice-ts';
const { isRecording, results, start } = useVoiceRecognition({
  onResult: setText,
});
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

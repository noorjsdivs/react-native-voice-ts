/**
 * TEST FILE - Voice Recognition Setup Verification
 * 
 * This file demonstrates that all imports work correctly and
 * showcases both standard and continuous modes.
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';

// ✅ Verify all imports work correctly
import {
  VoiceMicrophone,
  MicIcon,
  MicOffIcon,
  useVoiceRecognition,
} from 'react-native-voice-ts';

import type {
  VoiceMicrophoneProps,
  MicIconProps,
  MicOffIconProps,
  UseVoiceRecognitionOptions,
} from 'react-native-voice-ts';

/**
 * Main Demo Component - Toggle between modes
 */
export default function VoiceTestApp() {
  const [continuousMode, setContinuousMode] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Voice Recognition Test</Text>
          <Text style={styles.headerSubtitle}>
            Test both standard and continuous modes
          </Text>
        </View>

        <View style={styles.toggle}>
          <Text style={styles.toggleLabel}>
            {continuousMode ? '🔄 Continuous Mode' : '⚡ Standard Mode'}
          </Text>
          <Switch
            value={continuousMode}
            onValueChange={setContinuousMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={continuousMode ? '#007AFF' : '#f4f3f4'}
          />
        </View>

        {continuousMode ? (
          <ContinuousModeDemo />
        ) : (
          <StandardModeDemo />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Demo 1: Standard Mode (One-shot)
 * Stops after one result
 */
function StandardModeDemo() {
  const [text, setText] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleResult = (result: string) => {
    setText(result);
    setAttempts(attempts + 1);
  };

  return (
    <View style={styles.demo}>
      <View style={styles.demoHeader}>
        <Text style={styles.demoTitle}>Standard Mode</Text>
        <Text style={styles.demoDesc}>
          Tap mic → Speak → Auto-stops after one phrase
        </Text>
      </View>

      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="Say something..."
        multiline
      />

      <VoiceMicrophone
        onSpeechResult={handleResult}
        continuous={false}
        enablePartialResults={true}
        onError={(error) => console.error('[Standard] Error:', error)}
        onStart={() => console.log('[Standard] Started')}
        onStop={() => console.log('[Standard] Stopped')}
      >
        {({ isRecording, start, stop, error, partialText }) => (
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.micButton, isRecording && styles.micRecording]}
              onPress={isRecording ? stop : start}
            >
              {isRecording ? (
                <MicOffIcon size={28} color="#fff" />
              ) : (
                <MicIcon size={28} color="#fff" />
              )}
            </TouchableOpacity>

            <View style={styles.status}>
              {isRecording && (
                <Text style={styles.statusText}>
                  🎤 Listening... {partialText}
                </Text>
              )}
              {error && <Text style={styles.errorText}>❌ {error}</Text>}
              <Text style={styles.attemptsText}>Attempts: {attempts}</Text>
            </View>
          </View>
        )}
      </VoiceMicrophone>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>ℹ️ How it works:</Text>
        <Text style={styles.infoText}>• Tap to start</Text>
        <Text style={styles.infoText}>• Speak your phrase</Text>
        <Text style={styles.infoText}>• Stops automatically after result</Text>
        <Text style={styles.infoText}>• Tap again for new input</Text>
      </View>
    </View>
  );
}

/**
 * Demo 2: Continuous Mode
 * Keeps listening and appending words
 */
function ContinuousModeDemo() {
  const [text, setText] = useState('');
  const [silenceDuration, setSilenceDuration] = useState(3000);

  return (
    <View style={styles.demo}>
      <View style={styles.demoHeader}>
        <Text style={styles.demoTitle}>Continuous Mode ⭐</Text>
        <Text style={styles.demoDesc}>
          Keeps listening until you stop or {silenceDuration / 1000}s of silence
        </Text>
      </View>

      <TextInput
        style={[styles.textInput, styles.textInputLarge]}
        value={text}
        onChangeText={setText}
        placeholder="Start speaking... words will be appended"
        multiline
        numberOfLines={6}
      />

      <VoiceMicrophone
        onSpeechResult={setText}
        continuous={true}
        maxSilenceDuration={silenceDuration}
        enablePartialResults={true}
        onError={(error) => console.error('[Continuous] Error:', error)}
        onStart={() => console.log('[Continuous] Started')}
        onStop={() => console.log('[Continuous] Stopped')}
      >
        {({ isRecording, recognizedText, partialText, start, stop, error }) => (
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.micButton, isRecording && styles.micRecording]}
              onPress={isRecording ? stop : start}
            >
              {isRecording ? (
                <MicOffIcon size={28} color="#fff" />
              ) : (
                <MicIcon size={28} color="#fff" />
              )}
            </TouchableOpacity>

            <View style={styles.status}>
              {isRecording && (
                <View>
                  <Text style={styles.statusText}>
                    🔴 LIVE - Keep speaking
                  </Text>
                  {partialText && (
                    <Text style={styles.partialText}>
                      Currently: {partialText}
                    </Text>
                  )}
                </View>
              )}
              {error && <Text style={styles.errorText}>❌ {error}</Text>}
              {recognizedText && (
                <Text style={styles.recognizedText}>
                  ✅ Recognized: {recognizedText.length} chars
                </Text>
              )}
            </View>
          </View>
        )}
      </VoiceMicrophone>

      <View style={styles.silenceControl}>
        <Text style={styles.silenceLabel}>
          Silence Timeout: {silenceDuration / 1000}s
        </Text>
        <View style={styles.silenceButtons}>
          <TouchableOpacity
            style={styles.silenceButton}
            onPress={() => setSilenceDuration(2000)}
          >
            <Text style={styles.silenceButtonText}>2s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.silenceButton}
            onPress={() => setSilenceDuration(3000)}
          >
            <Text style={styles.silenceButtonText}>3s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.silenceButton}
            onPress={() => setSilenceDuration(5000)}
          >
            <Text style={styles.silenceButtonText}>5s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.silenceButton}
            onPress={() => setSilenceDuration(10000)}
          >
            <Text style={styles.silenceButtonText}>10s</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>ℹ️ How it works:</Text>
        <Text style={styles.infoText}>• Tap to start continuous listening</Text>
        <Text style={styles.infoText}>• Speak naturally, pause when needed</Text>
        <Text style={styles.infoText}>• Words are automatically appended</Text>
        <Text style={styles.infoText}>• Tap stop or wait for silence timeout</Text>
      </View>

      <View style={styles.clearButton}>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setText('')}
        >
          <Text style={styles.clearBtnText}>Clear Text</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * Demo 3: Using the Hook Directly
 */
export function HookUsageDemo() {
  const [searchQuery, setSearchQuery] = useState('');

  const { isRecording, results, partialResults, error, start, stop, reset } =
    useVoiceRecognition({
      locale: 'en-US',
      enablePartialResults: true,
      continuous: true,
      maxSilenceDuration: 5000,
      onResult: (text) => {
        setSearchQuery(text);
        console.log('Hook result:', text);
      },
      onError: (err) => console.error('Hook error:', err),
    });

  return (
    <View style={styles.demo}>
      <View style={styles.demoHeader}>
        <Text style={styles.demoTitle}>Hook Usage</Text>
        <Text style={styles.demoDesc}>Using useVoiceRecognition hook</Text>
      </View>

      <TextInput
        style={styles.textInput}
        value={results[0] || searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Hook-based voice input..."
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.micButton, isRecording && styles.micRecording]}
          onPress={isRecording ? stop : start}
        >
          {isRecording ? (
            <MicOffIcon size={28} color="#fff" />
          ) : (
            <MicIcon size={28} color="#fff" />
          )}
        </TouchableOpacity>

        <View style={styles.status}>
          {isRecording && partialResults[0] && (
            <Text style={styles.partialText}>🎤 {partialResults[0]}</Text>
          )}
          {error && <Text style={styles.errorText}>❌ {error}</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.clearBtn} onPress={reset}>
        <Text style={styles.clearBtnText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  demo: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  demoHeader: {
    marginBottom: 16,
  },
  demoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  demoDesc: {
    fontSize: 14,
    color: '#666',
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    minHeight: 50,
  },
  textInputLarge: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  controls: {
    alignItems: 'center',
    marginBottom: 16,
  },
  micButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  micRecording: {
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
  },
  status: {
    marginTop: 16,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  partialText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  recognizedText: {
    fontSize: 14,
    color: '#34C759',
    marginTop: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 4,
  },
  attemptsText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  silenceControl: {
    marginBottom: 16,
  },
  silenceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  silenceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  silenceButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  silenceButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  info: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  clearButton: {
    marginTop: 8,
  },
  clearBtn: {
    padding: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

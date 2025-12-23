import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { VoiceMicrophone, MicIcon, MicOffIcon } from 'react-native-voice-ts';

/**
 * YOUR UPDATED SETUP - Continuous Voice Search
 * 
 * This fixes the issue where the microphone was stopping after one word.
 * Now it will continue listening and append words until you stop it.
 */
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

      {/* 
        KEY CHANGE: Added continuous={true}
        This keeps the microphone listening and appends words
        instead of stopping after one word.
        
        Other important props:
        - maxSilenceDuration={3000}: Stops after 3 seconds of silence
        - enablePartialResults={true}: Shows real-time transcription
      */}
      <VoiceMicrophone
        onSpeechResult={setText}
        continuous={true}
        maxSilenceDuration={3000}
        enablePartialResults={true}
        onError={(error) => console.error('Voice error:', error)}
      >
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  mic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
});

/**
 * WHAT CHANGED:
 * 
 * BEFORE (Your Original Code):
 * <VoiceMicrophone onSpeechResult={setText}>
 * 
 * AFTER (Fixed Code):
 * <VoiceMicrophone
 *   onSpeechResult={setText}
 *   continuous={true}              ← ADDED: Keeps listening
 *   maxSilenceDuration={3000}      ← ADDED: Auto-stop after 3s silence
 *   enablePartialResults={true}    ← ADDED: Real-time transcription
 *   onError={(error) => ...}       ← ADDED: Error handling
 * >
 * 
 * BEHAVIOR:
 * - Before: Microphone stopped after capturing one word
 * - After: Microphone continues listening and appends words
 * - Stops automatically after 3 seconds of silence
 * - Or stops when you press the stop button
 * 
 * ADJUST maxSilenceDuration:
 * - 3000 = 3 seconds (good for normal speaking)
 * - 5000 = 5 seconds (good for slower speakers)
 * - 10000 = 10 seconds (for long pauses)
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { VoiceMicrophone, MicIcon, MicOffIcon } from 'react-native-voice-ts';

/**
 * Example: Voice Search with Continuous Listening
 * 
 * This example demonstrates how to use VoiceMicrophone with continuous mode
 * enabled to keep listening and append words instead of stopping after one word.
 */
export default function VoiceSearchWithContinuous() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Search (Continuous)</Text>
      <Text style={styles.subtitle}>
        The microphone will keep listening until you stop it
      </Text>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Start speaking..."
        multiline
      />

      <VoiceMicrophone
        onSpeechResult={setText}
        continuous={true}
        enablePartialResults={true}
        maxSilenceDuration={3000}
        onError={(error) => console.error('Voice error:', error)}
      >
        {({ isRecording, start, stop, partialText }) => (
          <View style={styles.micContainer}>
            <TouchableOpacity
              style={[styles.mic, isRecording && styles.recording]}
              onPress={isRecording ? stop : start}
            >
              {isRecording ? (
                <MicOffIcon size={32} color="#fff" />
              ) : (
                <MicIcon size={32} color="#fff" />
              )}
            </TouchableOpacity>
            
            {isRecording && (
              <Text style={styles.status}>
                {partialText ? 'Listening...' : 'Speak now...'}
              </Text>
            )}
            
            {partialText && (
              <Text style={styles.partial}>{partialText}</Text>
            )}
          </View>
        )}
      </VoiceMicrophone>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  micContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  mic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  status: {
    marginTop: 12,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  partial: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

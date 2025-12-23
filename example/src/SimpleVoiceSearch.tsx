import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { VoiceMicrophone, MicIcon, MicOffIcon } from 'react-native-voice-ts';

/**
 * Example: Simple Voice Search (Standard Mode)
 * 
 * This example shows standard voice search where the microphone
 * stops after getting one result. Good for short commands or queries.
 */
export default function SimpleVoiceSearch() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Voice Search</Text>
      <Text style={styles.subtitle}>
        Speak a command or query
      </Text>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Search..."
      />

      <VoiceMicrophone
        onSpeechResult={setText}
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

/**
 * Example: Advanced Voice Input with Hook
 * 
 * This example uses the useVoiceRecognition hook directly
 * for more control and customization.
 */
export function AdvancedVoiceInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleResult = (text: string) => {
    setSearchQuery(text);
    if (text && !history.includes(text)) {
      setHistory([text, ...history.slice(0, 9)]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Advanced Voice Input</Text>
      
      <VoiceMicrophone
        onSpeechResult={handleResult}
        continuous={false}
        enablePartialResults={true}
        locale="en-US"
      >
        {({ isRecording, recognizedText, partialText, start, stop, error }) => (
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.advancedInput}
                value={recognizedText || searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Type or speak your search..."
              />
              
              <TouchableOpacity
                style={[styles.inlineBtn, isRecording && styles.recording]}
                onPress={isRecording ? stop : start}
              >
                {isRecording ? (
                  <MicOffIcon size={20} color="#fff" />
                ) : (
                  <MicIcon size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>

            {isRecording && partialText && (
              <Text style={styles.liveText}>
                🎤 {partialText}
              </Text>
            )}

            {error && (
              <Text style={styles.errorText}>❌ {error}</Text>
            )}

            {history.length > 0 && (
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Recent Searches:</Text>
                {history.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.historyItem}
                    onPress={() => setSearchQuery(item)}
                  >
                    <Text style={styles.historyText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      </VoiceMicrophone>
    </ScrollView>
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
    marginBottom: 16,
  },
  mic: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    overflow: 'hidden',
  },
  advancedInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  inlineBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  liveText: {
    fontSize: 14,
    color: '#007AFF',
    fontStyle: 'italic',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SimpleVoiceSearch;

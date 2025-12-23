import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {VoiceMicrophone, MicIcon, MicOffIcon} from 'react-native-voice-ts';

const VoiceSearchExample = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🎤 Voice Search Example</Text>
        <Text style={styles.subtitle}>
          Use the microphone button to search with your voice
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search or speak..."
            placeholderTextColor="#999"
          />

          <VoiceMicrophone
            locale="en-US"
            onSpeechResult={text => {
              setSearchText(text);
              console.log('Speech result:', text);
            }}
            onPartialResult={text => {
              console.log('Partial result:', text);
            }}
            onError={error => {
              console.error('Voice error:', error);
            }}>
            {({isRecording, partialText, start, stop, error}) => (
              <View style={styles.micContainer}>
                <TouchableOpacity
                  style={[styles.micButton, isRecording && styles.recording]}
                  onPress={isRecording ? stop : start}>
                  {isRecording ? (
                    <MicOffIcon size={28} color="#fff" />
                  ) : (
                    <MicIcon size={28} color="#fff" />
                  )}
                </TouchableOpacity>

                {isRecording && partialText && (
                  <View style={styles.liveTextContainer}>
                    <Text style={styles.liveTextLabel}>Listening...</Text>
                    <Text style={styles.liveText}>{partialText}</Text>
                  </View>
                )}

                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
            )}
          </VoiceMicrophone>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to use:</Text>
          <Text style={styles.infoText}>
            1. Tap the microphone button{'\n'}
            2. Speak your search query{'\n'}
            3. Tap again to stop recording{'\n'}
            4. Your speech will appear in the search box
          </Text>
        </View>

        {searchText !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Search Result:</Text>
            <Text style={styles.resultText}>{searchText}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  micContainer: {
    alignItems: 'center',
  },
  micButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  recording: {
    backgroundColor: '#FF3B30',
  },
  micIcon: {
    fontSize: 30,
  },
  liveTextContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    width: '100%',
  },
  liveTextLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  liveText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  resultContainer: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});

export default VoiceSearchExample;

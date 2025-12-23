import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useVoiceRecognition, MicIcon, MicOffIcon} from 'react-native-voice-ts';

const VoiceHookExample = () => {
  const [savedText, setSavedText] = useState('');

  const {isRecording, results, partialResults, error, start, stop, reset} =
    useVoiceRecognition({
      locale: 'en-US',
      enablePartialResults: true,
      onResult: text => {
        console.log('Voice result:', text);
        setSavedText(text);
      },
      onError: err => {
        console.error('Voice error:', err);
      },
    });

  const handleReset = () => {
    reset();
    setSavedText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🎯 useVoiceRecognition Hook</Text>
        <Text style={styles.subtitle}>
          Example using the custom hook for voice recognition
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, isRecording && styles.activeDot]} />
            <Text style={styles.statusText}>
              {isRecording ? 'Recording...' : 'Ready'}
            </Text>
          </View>
        </View>

        {isRecording && partialResults.length > 0 && (
          <View style={[styles.card, styles.liveCard]}>
            <Text style={styles.cardTitle}>🎙 Live Transcription</Text>
            <Text style={styles.liveText}>{partialResults[0]}</Text>
          </View>
        )}

        {results.length > 0 && (
          <View style={[styles.card, styles.resultsCard]}>
            <Text style={styles.cardTitle}>📝 Final Results</Text>
            {results.map((result, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultNumber}>#{index + 1}</Text>
                <Text style={styles.resultText}>{result}</Text>
              </View>
            ))}
          </View>
        )}

        {savedText && (
          <View style={[styles.card, styles.savedCard]}>
            <Text style={styles.cardTitle}>✅ Saved Text</Text>
            <Text style={styles.savedText}>{savedText}</Text>
          </View>
        )}

        {error && (
          <View style={[styles.card, styles.errorCard]}>
            <Text style={styles.errorTitle}>⚠️ Error</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              isRecording && styles.recordingButton,
            ]}
            onPress={isRecording ? stop : start}>
            <View style={styles.buttonIcon}>
              {isRecording ? (
                <MicOffIcon size={24} color="#fff" />
              ) : (
                <MicIcon size={24} color="#fff" />
              )}
            </View>
            <Text style={styles.buttonText}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleReset}>
            <Text style={styles.buttonIcon}>🔄</Text>
            <Text style={[styles.buttonText, styles.secondaryText]}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Hook Features:</Text>
          <Text style={styles.infoItem}>• Automatic event listener setup</Text>
          <Text style={styles.infoItem}>• Real-time partial results</Text>
          <Text style={styles.infoItem}>• Multiple result options</Text>
          <Text style={styles.infoItem}>• Built-in error handling</Text>
          <Text style={styles.infoItem}>• Easy state management</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  activeDot: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  liveCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  liveText: {
    fontSize: 16,
    color: '#1976D2',
    fontStyle: 'italic',
  },
  resultsCard: {
    backgroundColor: '#f3e5f5',
    borderColor: '#9C27B0',
    borderWidth: 1,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  resultNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C27B0',
    marginRight: 8,
  },
  resultText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  savedCard: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  savedText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  errorCard: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#c62828',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#d32f2f',
  },
  controls: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  recordingButton: {
    backgroundColor: '#FF3B30',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryText: {
    color: '#007AFF',
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 15,
    borderColor: '#ffc107',
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  infoItem: {
    fontSize: 13,
    color: '#856404',
    marginBottom: 4,
  },
});

export default VoiceHookExample;

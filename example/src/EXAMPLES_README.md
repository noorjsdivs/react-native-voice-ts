# Voice Search Examples

This directory contains examples demonstrating different voice recognition patterns.

## Examples

### 1. Simple Voice Search (`SimpleVoiceSearch.tsx`)

Basic voice search that stops after one command/query. Perfect for:
- Voice commands
- Single-word or short-phrase searches
- Quick voice inputs

```tsx
import { VoiceMicrophone, MicIcon, MicOffIcon } from 'react-native-voice-ts';

<VoiceMicrophone onSpeechResult={setText}>
  {({ isRecording, start, stop }) => (
    <TouchableOpacity onPress={isRecording ? stop : start}>
      {isRecording ? <MicOffIcon /> : <MicIcon />}
    </TouchableOpacity>
  )}
</VoiceMicrophone>
```

### 2. Continuous Voice Search (`VoiceSearchWithContinuous.tsx`)

Keeps listening and appending words until you stop it. Perfect for:
- Dictation
- Long-form content
- Multi-sentence input

```tsx
<VoiceMicrophone
  onSpeechResult={setText}
  continuous={true}
  maxSilenceDuration={3000}
>
  {({ isRecording, start, stop, partialText }) => (
    // Your UI here
  )}
</VoiceMicrophone>
```

## Key Differences

### Standard Mode (default)
- `continuous={false}` or omit the prop
- Microphone stops after getting one result
- Best for quick commands or searches

### Continuous Mode
- `continuous={true}`
- Microphone keeps listening until you stop it
- Automatically restarts after each word/phrase
- Words are appended with spaces
- Stops automatically after `maxSilenceDuration` (default: 5 seconds)

## Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `continuous` | boolean | `false` | Enable continuous listening mode |
| `maxSilenceDuration` | number | `5000` | Max silence (ms) before auto-stop in continuous mode |
| `enablePartialResults` | boolean | `true` | Show real-time transcription |
| `locale` | string | `'en-US'` | Language for recognition |
| `onSpeechResult` | function | - | Called with final recognized text |
| `onPartialResult` | function | - | Called with partial/real-time text |
| `onError` | function | - | Called when errors occur |

## Common Issues & Solutions

### Issue: Microphone stops after one word
**Solution:** Enable continuous mode:
```tsx
<VoiceMicrophone continuous={true} ... />
```

### Issue: Too sensitive to silence
**Solution:** Increase maxSilenceDuration:
```tsx
<VoiceMicrophone continuous={true} maxSilenceDuration={8000} ... />
```

### Issue: Not capturing full sentences
**Solution:** 
1. Enable continuous mode
2. Ensure `enablePartialResults={true}` 
3. Increase `maxSilenceDuration`

## Testing Tips

1. **Test in a quiet environment** first to establish baseline behavior
2. **Adjust maxSilenceDuration** based on speaking pace
3. **Monitor partialText** to see real-time recognition
4. **Handle errors gracefully** with the `onError` callback

## Platform-Specific Notes

### Android
- Requires `RECORD_AUDIO` permission
- Auto-requests permission if not granted
- May show native voice recognition UI

### iOS
- Requires `NSMicrophoneUsageDescription` in Info.plist
- Requires `NSSpeechRecognitionUsageDescription` in Info.plist
- May prompt for permissions on first use

## Performance Considerations

- Continuous mode uses more battery
- Partial results increase processing overhead
- Consider user experience when setting silence duration
- Clean up listeners properly to avoid memory leaks

## Need More Help?

Check the main README.md for:
- Installation instructions
- Full API documentation
- Advanced usage patterns
- Troubleshooting guide

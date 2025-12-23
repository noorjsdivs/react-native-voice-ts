# Contributing to React Native Voice

Thank you for your interest in contributing to React Native Voice! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Environment details**:
  - React Native version
  - Device/Emulator and OS version
  - Package version
  - Any relevant configuration

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- Device: [e.g. iPhone 15, Samsung Galaxy S24]
- OS: [e.g. iOS 17.2, Android 14]
- React Native Version: [e.g. 0.76.9]
- Package Version: [e.g. 3.2.4]

**Additional context**
Any other context about the problem.
```

## 💡 Suggesting Features

Feature suggestions are welcome! Before creating a feature request:

1. Check if the feature already exists
2. Search existing feature requests
3. Provide a clear use case and rationale
4. Consider backward compatibility

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, screenshots, or examples.
```

## 🔧 Development Setup

### Prerequisites

- Node.js (>= 18.x)
- Yarn package manager
- React Native development environment set up
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/react-native-voice-ts.git
cd react-native-voice-ts
```

3. Install dependencies:

```bash
yarn install
```

4. Set up the example project:

```bash
cd example
yarn install
cd ios && pod install && cd ..
```

### Running the Example

**iOS:**

```bash
cd example
yarn ios
```

**Android:**

```bash
cd example
yarn android
```

## 📝 Pull Request Process

1. **Create a branch** from `main`:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make your changes** following our coding standards

3. **Write or update tests** if applicable

4. **Update documentation** if you changed any public APIs

5. **Run linting and formatting**:

```bash
yarn lint
yarn format
```

6. **Build the project** to ensure no errors:

```bash
yarn build
```

7. **Test thoroughly** on both iOS and Android

8. **Commit your changes** using conventional commits:

```bash
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve issue with X"
```

9. **Push to your fork**:

```bash
git push origin feature/your-feature-name
```

10. **Create a Pull Request** with:
    - Clear title and description
    - Reference to related issues
    - Screenshots/videos for UI changes
    - Test results on both platforms

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build process or auxiliary tool changes

Examples:

```
feat: add volume monitoring callback
fix: resolve Android permission crash
docs: update API reference for new methods
perf: optimize event listener cleanup
```

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Properly type all functions and variables
- Avoid `any` types when possible
- Export types for public APIs

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Follow existing code patterns
- Keep functions small and focused

### File Structure

```
src/
├── index.ts              # Main export file
├── VoiceModuleTypes.ts   # Type definitions
├── NativeVoiceIOS.ts     # iOS native module
└── NativeVoiceAndroid.ts # Android native module
```

## 🧪 Testing

### Manual Testing

Test your changes on:

- ✅ iOS (physical device preferred)
- ✅ Android (physical device preferred)
- ✅ Different React Native versions (if applicable)
- ✅ Different OS versions

### Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Breaking changes documented

## 📚 Documentation

When adding or modifying features:

1. **Update README.md** with API changes
2. **Add examples** to EXAMPLES.md
3. **Update TypeScript definitions**
4. **Document breaking changes** in CHANGELOG.md

## 🔍 Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be included in the next release

## 📦 Release Process

Releases are managed by maintainers:

1. Version bump following semantic versioning
2. Update CHANGELOG.md
3. Create GitHub release
4. Publish to npm

## 🙋 Getting Help

- **Questions?** Open a [Discussion](https://github.com/noorjsdivs/react-native-voice-ts/discussions)
- **Issues?** Create an [Issue](https://github.com/noorjsdivs/react-native-voice-ts/issues)
- **Security concerns?** Email noor.jsdivs@gmail.com

## 🏆 Recognition

Contributors will be recognized in:

- Release notes
- Contributors section
- Project documentation

Thank you for contributing to React Native Voice! 🎉

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

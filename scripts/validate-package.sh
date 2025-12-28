#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Validating react-native-voice-ts package..."
echo ""

# Check if required files exist
echo "📋 Checking required files..."
files=(
  "package.json"
  "react-native-voice-ts.podspec"
  "android/build.gradle"
  "ios/Voice/Voice.h"
  "ios/Voice/Voice.mm"
  "src/index.ts"
  "README.md"
  "LICENSE"
)

all_files_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file (missing)"
    all_files_exist=false
  fi
done

echo ""

# Check package.json structure
echo "📦 Checking package.json..."
if command -v node &> /dev/null; then
  node -e "
    const pkg = require('./package.json');
    const checks = {
      'Package name': pkg.name === 'react-native-voice-ts',
      'Main entry': pkg.main === 'dist/index.js',
      'Types entry': pkg.types === 'dist/index.d.ts',
      'Podspec in files': pkg.files.includes('react-native-voice-ts.podspec'),
      'iOS folder in files': pkg.files.includes('ios'),
      'Android folder in files': pkg.files.includes('android'),
      'Peer dependency (RN)': pkg.peerDependencies && pkg.peerDependencies['react-native'],
    };
    
    let allPass = true;
    for (const [check, result] of Object.entries(checks)) {
      if (result) {
        console.log('\x1b[32m✓\x1b[0m', check);
      } else {
        console.log('\x1b[31m✗\x1b[0m', check);
        allPass = false;
      }
    }
    process.exit(allPass ? 0 : 1);
  "
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Package.json structure is valid${NC}"
  else
    echo -e "${RED}Package.json has issues${NC}"
    all_files_exist=false
  fi
else
  echo -e "${YELLOW}⚠ Node.js not found, skipping package.json validation${NC}"
fi

echo ""

# Check podspec
echo "🍎 Checking iOS Podspec..."
if [ -f "react-native-voice-ts.podspec" ]; then
  if grep -q 's.name.*=.*"react-native-voice-ts"' react-native-voice-ts.podspec; then
    echo -e "${GREEN}✓${NC} Podspec name is correct"
  else
    echo -e "${RED}✗${NC} Podspec name mismatch"
    all_files_exist=false
  fi
  
  if grep -q 's.platform.*=.*:ios' react-native-voice-ts.podspec; then
    echo -e "${GREEN}✓${NC} iOS platform specified"
  else
    echo -e "${RED}✗${NC} iOS platform not specified"
    all_files_exist=false
  fi
  
  if grep -q 'install_modules_dependencies' react-native-voice-ts.podspec; then
    echo -e "${GREEN}✓${NC} New Architecture support detected"
  else
    echo -e "${YELLOW}⚠${NC} New Architecture support not detected"
  fi
else
  echo -e "${RED}✗${NC} Podspec not found"
  all_files_exist=false
fi

echo ""

# Check Android build.gradle
echo "🤖 Checking Android Configuration..."
if [ -f "android/build.gradle" ]; then
  if grep -q 'apply plugin: "com.android.library"' android/build.gradle; then
    echo -e "${GREEN}✓${NC} Android library plugin configured"
  else
    echo -e "${RED}✗${NC} Android library plugin not found"
    all_files_exist=false
  fi
  
  if grep -q 'apply plugin: "kotlin-android"' android/build.gradle; then
    echo -e "${GREEN}✓${NC} Kotlin plugin configured"
  else
    echo -e "${YELLOW}⚠${NC} Kotlin plugin not found"
  fi
  
  if grep -q 'isNewArchitectureEnabled' android/build.gradle; then
    echo -e "${GREEN}✓${NC} New Architecture support detected"
  else
    echo -e "${YELLOW}⚠${NC} New Architecture support not detected"
  fi
else
  echo -e "${RED}✗${NC} android/build.gradle not found"
  all_files_exist=false
fi

echo ""

# Check TypeScript compilation
echo "📘 Checking TypeScript..."
if [ -f "tsconfig.json" ] && command -v npx &> /dev/null; then
  echo "Compiling TypeScript..."
  if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
    echo -e "${RED}✗${NC} TypeScript compilation has errors"
    npx tsc --noEmit 2>&1 | head -20
    all_files_exist=false
  else
    echo -e "${GREEN}✓${NC} TypeScript compiles successfully"
  fi
else
  echo -e "${YELLOW}⚠${NC} Skipping TypeScript check"
fi

echo ""

# Check if dist folder exists (built)
echo "🏗️ Checking build output..."
if [ -d "dist" ]; then
  if [ -f "dist/index.js" ] && [ -f "dist/index.d.ts" ]; then
    echo -e "${GREEN}✓${NC} Build output exists"
  else
    echo -e "${YELLOW}⚠${NC} Build output incomplete (run: yarn build)"
  fi
else
  echo -e "${YELLOW}⚠${NC} Build output not found (run: yarn build)"
fi

echo ""

# Final result
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$all_files_exist" = true ]; then
  echo -e "${GREEN}✅ Package validation PASSED${NC}"
  echo ""
  echo "Your package is ready for:"
  echo "  • Local testing: cd example && yarn ios/android"
  echo "  • Publishing: npm publish"
  exit 0
else
  echo -e "${RED}❌ Package validation FAILED${NC}"
  echo ""
  echo "Please fix the issues above before publishing."
  exit 1
fi

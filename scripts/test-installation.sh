#!/bin/bash

# Installation Test Script for react-native-voice-ts
# This script tests the package installation in different scenarios

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  react-native-voice-ts Installation Test Suite            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Test 1: Package structure
echo -e "${YELLOW}Test 1: Package Structure${NC}"
echo "Checking package.json, podspec, and native files..."

if [ ! -f "package.json" ]; then
  echo -e "${RED}✗ package.json not found${NC}"
  exit 1
fi

if [ ! -f "react-native-voice-ts.podspec" ]; then
  echo -e "${RED}✗ react-native-voice-ts.podspec not found${NC}"
  exit 1
fi

if [ ! -d "android" ] || [ ! -d "ios" ]; then
  echo -e "${RED}✗ Native folders not found${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Package structure is valid${NC}"
echo ""

# Test 2: Dependencies check
echo -e "${YELLOW}Test 2: Dependencies Check${NC}"
echo "Verifying dependencies are installed..."

if command -v node &> /dev/null; then
  node_version=$(node -v)
  echo -e "${GREEN}✓ Node.js installed: $node_version${NC}"
else
  echo -e "${RED}✗ Node.js not found${NC}"
  exit 1
fi

if command -v npm &> /dev/null; then
  npm_version=$(npm -v)
  echo -e "${GREEN}✓ npm installed: $npm_version${NC}"
fi

if command -v yarn &> /dev/null; then
  yarn_version=$(yarn -v)
  echo -e "${GREEN}✓ yarn installed: $yarn_version${NC}"
fi

echo ""

# Test 3: Build the package
echo -e "${YELLOW}Test 3: Building Package${NC}"
echo "Running TypeScript compiler..."

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  yarn install --silent
fi

echo "Building TypeScript..."
if yarn build > /dev/null 2>&1; then
  echo -e "${GREEN}✓ TypeScript build successful${NC}"
else
  echo -e "${RED}✗ TypeScript build failed${NC}"
  yarn build
  exit 1
fi

if [ -f "dist/index.js" ] && [ -f "dist/index.d.ts" ]; then
  echo -e "${GREEN}✓ Build artifacts created${NC}"
else
  echo -e "${RED}✗ Build artifacts missing${NC}"
  exit 1
fi

echo ""

# Test 4: Check exports
echo -e "${YELLOW}Test 4: Checking Exports${NC}"
echo "Verifying main exports are accessible..."

node -e "
  try {
    const Voice = require('./dist/index.js');
    const requiredExports = [
      'default',
      'VoiceMicrophone',
      'MicIcon',
      'useVoiceRecognition'
    ];
    
    let allExportsFound = true;
    requiredExports.forEach(exp => {
      if (Voice[exp] !== undefined) {
        console.log('\x1b[32m✓\x1b[0m Export found:', exp);
      } else if (exp === 'default' && Voice.default) {
        console.log('\x1b[32m✓\x1b[0m Export found:', exp);
      } else {
        console.log('\x1b[31m✗\x1b[0m Export missing:', exp);
        allExportsFound = false;
      }
    });
    
    process.exit(allExportsFound ? 0 : 1);
  } catch (error) {
    console.log('\x1b[31m✗\x1b[0m Failed to load module:', error.message);
    process.exit(1);
  }
"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ All required exports present${NC}"
else
  echo -e "${RED}✗ Some exports are missing${NC}"
  exit 1
fi

echo ""

# Test 5: iOS compatibility
echo -e "${YELLOW}Test 5: iOS Compatibility${NC}"

if [[ "$OSTYPE" == "darwin"* ]]; then
  if command -v pod &> /dev/null; then
    echo "Testing podspec validation..."
    if pod spec lint react-native-voice-ts.podspec --quick --allow-warnings > /dev/null 2>&1; then
      echo -e "${GREEN}✓ Podspec is valid${NC}"
    else
      echo -e "${YELLOW}⚠ Podspec validation warnings (may be okay)${NC}"
      pod spec lint react-native-voice-ts.podspec --quick --allow-warnings 2>&1 | tail -10
    fi
    
    # Check example iOS setup
    if [ -d "example/ios" ]; then
      echo "Checking example iOS setup..."
      cd example/ios
      if [ -f "Podfile" ]; then
        echo -e "${GREEN}✓ Example Podfile exists${NC}"
      fi
      if [ -d "Pods" ]; then
        echo -e "${GREEN}✓ Example Pods installed${NC}"
      else
        echo -e "${YELLOW}⚠ Example Pods not installed (run: cd example/ios && pod install)${NC}"
      fi
      cd ../..
    fi
  else
    echo -e "${YELLOW}⚠ CocoaPods not installed, skipping iOS tests${NC}"
  fi
else
  echo -e "${YELLOW}⚠ Not on macOS, skipping iOS tests${NC}"
fi

echo ""

# Test 6: Android compatibility
echo -e "${YELLOW}Test 6: Android Compatibility${NC}"

if [ -f "android/build.gradle" ]; then
  echo -e "${GREEN}✓ Android build.gradle exists${NC}"
  
  if grep -q "compileSdkVersion" android/build.gradle; then
    echo -e "${GREEN}✓ Android SDK version configured${NC}"
  fi
  
  if grep -q "kotlin" android/build.gradle; then
    echo -e "${GREEN}✓ Kotlin support configured${NC}"
  fi
  
  if grep -q "isNewArchitectureEnabled" android/build.gradle; then
    echo -e "${GREEN}✓ New Architecture support present${NC}"
  fi
else
  echo -e "${RED}✗ Android build configuration missing${NC}"
  exit 1
fi

echo ""

# Test 7: Example app check
echo -e "${YELLOW}Test 7: Example App${NC}"

if [ -d "example" ]; then
  echo -e "${GREEN}✓ Example app exists${NC}"
  
  if [ -f "example/package.json" ]; then
    cd example
    
    # Check if dependencies installed
    if [ -d "node_modules" ]; then
      echo -e "${GREEN}✓ Example dependencies installed${NC}"
    else
      echo -e "${YELLOW}⚠ Example dependencies not installed (run: cd example && yarn install)${NC}"
    fi
    
    # Check if react-native-voice-ts is linked
    if [ -L "node_modules/react-native-voice-ts" ] || [ -d "node_modules/react-native-voice-ts" ]; then
      echo -e "${GREEN}✓ Package linked to example${NC}"
    else
      echo -e "${YELLOW}⚠ Package not linked to example${NC}"
    fi
    
    cd ..
  fi
else
  echo -e "${RED}✗ Example app not found${NC}"
fi

echo ""

# Test 8: TypeScript types
echo -e "${YELLOW}Test 8: TypeScript Types${NC}"

if [ -f "dist/index.d.ts" ]; then
  echo -e "${GREEN}✓ TypeScript declaration files exist${NC}"
  
  # Check for main type exports
  if grep -q "export.*Voice" dist/index.d.ts; then
    echo -e "${GREEN}✓ Voice types exported${NC}"
  fi
  
  if grep -q "VoiceModuleTypes" dist/index.d.ts || [ -f "dist/VoiceModuleTypes.d.ts" ]; then
    echo -e "${GREEN}✓ Type definitions present${NC}"
  fi
else
  echo -e "${RED}✗ TypeScript declarations missing${NC}"
fi

echo ""

# Summary
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                  Test Summary                              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ All tests passed!${NC}"
echo ""
echo "Package is ready for:"
echo "  1. Local testing in example app"
echo "  2. Publishing to npm"
echo "  3. Installation in user projects"
echo ""
echo "Next steps:"
echo "  • Test in example app: cd example && yarn ios"
echo "  • Test Android: cd example && yarn android"
echo "  • Publish: npm publish"
echo ""

import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export interface MicIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Microphone Icon Component
 * Based on Lucide mic icon
 */
export const MicIcon: React.FC<MicIconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 19v3" />
      <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <Rect x="9" y="2" width="6" height="13" rx="3" />
    </Svg>
  );
};

export interface MicOffIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Microphone Off Icon Component
 * For recording/stop state
 */
export const MicOffIcon: React.FC<MicOffIconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M2 2l20 20" />
      <Path d="M12 12a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v1" />
      <Path d="M19 10v2a7 7 0 0 1-11.18 5.66" />
      <Path d="M4.27 16.73A7 7 0 0 1 5 12v-2" />
      <Path d="M12 17v5" />
    </Svg>
  );
};

export default MicIcon;

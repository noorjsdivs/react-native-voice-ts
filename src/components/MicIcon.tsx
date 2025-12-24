import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';

export interface MicIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Standard Microphone Icon (Variant 1)
 * Classic microphone with rounded capsule
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
      <Path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <Line x1="12" y1="19" x2="12" y2="22" />
    </Svg>
  );
};

export interface MicOffIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

/**
 * Standard Microphone Off Icon (Variant 1)
 * Shows microphone with slash through it
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
      <Line x1="2" y1="2" x2="22" y2="22" />
      <Path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <Path d="M5 10v2a7 7 0 0 0 12 5" />
      <Path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <Path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <Line x1="12" y1="19" x2="12" y2="22" />
    </Svg>
  );
};

/**
 * Filled Microphone Icon (Variant 2)
 * Solid/filled microphone for active state
 */
export const MicIconFilled: React.FC<MicIconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <Path
        d="M19 10v2a7 7 0 0 1-14 0v-2"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Line
        x1="12"
        y1="19"
        x2="12"
        y2="22"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

/**
 * Filled Microphone Off Icon (Variant 2)
 * Solid microphone with mute indicator
 */
export const MicOffIconFilled: React.FC<MicOffIconProps> = ({
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
      <Line x1="2" y1="2" x2="22" y2="22" />
      <Path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" fill={color} />
      <Path d="M9 9v3a3 3 0 0 0 5.12 2.12" fill={color} />
      <Path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" fill="none" />
      <Path d="M5 10v2a7 7 0 0 0 12 5" fill="none" />
      <Line x1="12" y1="19" x2="12" y2="22" />
    </Svg>
  );
};

/**
 * Wave Microphone Icon (Variant 3)
 * Microphone with sound waves
 */
export const MicIconWave: React.FC<MicIconProps> = ({
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
      <Path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <Path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <Line x1="12" y1="19" x2="12" y2="22" />
      {/* Sound waves */}
      <Path d="M20 7v10" opacity="0.5" />
      <Path d="M23 9v6" opacity="0.3" />
      <Path d="M4 7v10" opacity="0.5" />
      <Path d="M1 9v6" opacity="0.3" />
    </Svg>
  );
};

/**
 * Wave Microphone Off Icon (Variant 3)
 * Microphone with muted waves
 */
export const MicOffIconWave: React.FC<MicOffIconProps> = ({
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
      <Line x1="2" y1="2" x2="22" y2="22" />
      <Path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <Path d="M5 10v2a7 7 0 0 0 12 5" />
      <Path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <Path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <Line x1="12" y1="19" x2="12" y2="22" />
      {/* Muted waves */}
      <Path d="M20 7v4" opacity="0.2" strokeDasharray="2,2" />
      <Path d="M4 7v4" opacity="0.2" strokeDasharray="2,2" />
    </Svg>
  );
};

export default MicIcon;

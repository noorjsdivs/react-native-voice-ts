/**
 * React Native Voice - Speech Recognition Utility Types
 *
 * This file contains helper types and interfaces for working with
 * speech recognition functionality.
 */

export interface VoiceOptions {
  /** Android: Language model type (LANGUAGE_MODEL_FREE_FORM or LANGUAGE_MODEL_WEB_SEARCH) */
  EXTRA_LANGUAGE_MODEL?: string;
  /** Android: Maximum number of results */
  EXTRA_MAX_RESULTS?: number;
  /** Android: Enable partial results */
  EXTRA_PARTIAL_RESULTS?: boolean;
  /** Android: Auto request permissions */
  REQUEST_PERMISSIONS_AUTO?: boolean;
  /** iOS: Detection mode (automatic, manual) */
  iosCategory?: string;
}

export interface RecognitionStats {
  /** Duration of recognition in milliseconds */
  duration: number;
  /** Whether recognition is currently active */
  isActive: boolean;
  /** Last recognized results */
  lastResults: string[];
  /** Start timestamp */
  startTime: number;
}

export interface PermissionResult {
  /** Whether permission was granted */
  granted: boolean;
  /** Error message if permission check failed */
  error?: string;
}

export interface Language {
  /** Language code (e.g., 'en-US') */
  code: string;
  /** Display name */
  name: string;
  /** Whether language is available */
  available: boolean;
}

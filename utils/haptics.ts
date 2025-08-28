// Haptic feedback utilities for mobile interactions
export const hapticFeedback = {
  // Light impact for button presses
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },
  
  // Medium impact for card interactions
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },
  
  // Heavy impact for important actions
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },
  
  // Success feedback
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 10]);
    }
  },
  
  // Error feedback
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 100, 50]);
    }
  }
};

// Check if device supports haptic feedback
export const supportsHaptics = (): boolean => {
  return 'vibrate' in navigator;
};
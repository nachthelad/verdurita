import { hapticFeedback, supportsHaptics } from '../haptics';

describe('hapticFeedback', () => {
  let mockVibrate: jest.Mock;

  beforeAll(() => {
    mockVibrate = jest.fn();
    // Mock navigator with vibrate function
    Object.defineProperty(global, 'navigator', {
      value: {
        vibrate: mockVibrate,
      },
      writable: true,
    });
  });

  beforeEach(() => {
    mockVibrate.mockClear();
    // Ensure navigator.vibrate is available for each test
    Object.defineProperty(global, 'navigator', {
      value: {
        vibrate: mockVibrate,
      },
      writable: true,
    });
  });

  describe('light', () => {
    it('should call navigator.vibrate with 10ms when supported', () => {
      hapticFeedback.light();
      expect(mockVibrate).toHaveBeenCalledWith(10);
    });

    it('should not call navigator.vibrate when not supported', () => {
      // Mock navigator without vibrate
      Object.defineProperty(global, 'navigator', {
        value: {},
        writable: true,
      });
      hapticFeedback.light();
      expect(mockVibrate).not.toHaveBeenCalled();
    });
  });

  describe('medium', () => {
    it('should call navigator.vibrate with 20ms when supported', () => {
      hapticFeedback.medium();
      expect(mockVibrate).toHaveBeenCalledWith(20);
    });
  });

  describe('heavy', () => {
    it('should call navigator.vibrate with 50ms when supported', () => {
      hapticFeedback.heavy();
      expect(mockVibrate).toHaveBeenCalledWith(50);
    });
  });

  describe('success', () => {
    it('should call navigator.vibrate with pattern [10, 50, 10] when supported', () => {
      hapticFeedback.success();
      expect(mockVibrate).toHaveBeenCalledWith([10, 50, 10]);
    });
  });

  describe('error', () => {
    it('should call navigator.vibrate with pattern [50, 100, 50] when supported', () => {
      hapticFeedback.error();
      expect(mockVibrate).toHaveBeenCalledWith([50, 100, 50]);
    });
  });
});

describe('supportsHaptics', () => {
  it('should return true when navigator.vibrate is available', () => {
    Object.defineProperty(global, 'navigator', {
      value: { vibrate: jest.fn() },
      writable: true,
    });

    expect(supportsHaptics()).toBe(true);
  });

  it('should return false when navigator.vibrate is not available', () => {
    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true,
    });
    expect(supportsHaptics()).toBe(false);
  });
});
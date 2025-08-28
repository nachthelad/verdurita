import { useState, useEffect } from 'react';

interface UserPreferences {
  darkMode: boolean;
  defaultCurrency: string;
  showCalculationHistory: boolean;
  hapticFeedback: boolean;
}

interface CalculationHistory {
  id: string;
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: Date;
}

const defaultPreferences: UserPreferences = {
  darkMode: false,
  defaultCurrency: 'Dólar Blue',
  showCalculationHistory: true,
  hapticFeedback: true,
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([]);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.error('Failed to parse user preferences:', error);
      }
    }

    // Load calculation history
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setCalculationHistory(parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })));
      } catch (error) {
        console.error('Failed to parse calculation history:', error);
      }
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('userPreferences', JSON.stringify(updated));
  };

  const addCalculation = (calculation: Omit<CalculationHistory, 'id' | 'timestamp'>) => {
    const newCalculation: CalculationHistory = {
      ...calculation,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    const updatedHistory = [newCalculation, ...calculationHistory].slice(0, 50); // Keep last 50
    setCalculationHistory(updatedHistory);
    localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setCalculationHistory([]);
    localStorage.removeItem('calculationHistory');
  };

  return {
    preferences,
    updatePreferences,
    calculationHistory,
    addCalculation,
    clearHistory,
  };
}
import {
  API_URLS,
  ADSENSE_CONFIG,
  SITE_CONFIG,
  EXTERNAL_LINKS,
  CURRENCY_MAPPINGS,
} from '../index';

describe('Constants', () => {
  describe('API_URLS', () => {
    it('should have valid URL formats', () => {
      expect(API_URLS.DOLAR).toMatch(/^https:\/\//);
      expect(API_URLS.REAL).toMatch(/^https:\/\//);
      expect(API_URLS.EURO).toMatch(/^https:\/\//);
    });

    it('should contain expected API endpoints', () => {
      expect(API_URLS.DOLAR).toContain('dolarapi.com');
      expect(API_URLS.REAL).toContain('dolarapi.com');
      expect(API_URLS.EURO).toContain('bluelytics.com.ar');
    });
  });

  describe('ADSENSE_CONFIG', () => {
    it('should have valid AdSense client ID format', () => {
      expect(ADSENSE_CONFIG.CLIENT_ID).toMatch(/^ca-pub-\d+$/);
    });

    it('should have valid script URL', () => {
      expect(ADSENSE_CONFIG.SCRIPT_URL).toMatch(/^https:\/\//);
      expect(ADSENSE_CONFIG.SCRIPT_URL).toContain('googlesyndication.com');
    });
  });

  describe('SITE_CONFIG', () => {
    it('should have valid site URL', () => {
      expect(SITE_CONFIG.URL).toMatch(/^https:\/\//);
      expect(SITE_CONFIG.URL).toContain('verdurita.com.ar');
    });

    it('should have descriptive name and description', () => {
      expect(SITE_CONFIG.NAME).toBeTruthy();
      expect(SITE_CONFIG.DESCRIPTION).toBeTruthy();
      expect(typeof SITE_CONFIG.NAME).toBe('string');
      expect(typeof SITE_CONFIG.DESCRIPTION).toBe('string');
    });
  });

  describe('EXTERNAL_LINKS', () => {
    it('should have valid external URLs', () => {
      expect(EXTERNAL_LINKS.GITHUB).toMatch(/^https:\/\//);
      expect(EXTERNAL_LINKS.CAFECITO).toMatch(/^https:\/\//);
      expect(EXTERNAL_LINKS.CAFECITO_BUTTON_BASE).toMatch(/^https:\/\//);
    });

    it('should point to correct domains', () => {
      expect(EXTERNAL_LINKS.GITHUB).toContain('github.com');
      expect(EXTERNAL_LINKS.CAFECITO).toContain('cafecito.app');
      expect(EXTERNAL_LINKS.CAFECITO_BUTTON_BASE).toContain('cdn.cafecito.app');
    });
  });

  describe('CURRENCY_MAPPINGS', () => {
    it('should contain all expected currencies', () => {
      const expectedCurrencies = [
        'dólar blue',
        'dólar oficial',
        'euro blue',
        'euro oficial',
        'real brasileño',
      ];

      expectedCurrencies.forEach(currency => {
        expect(CURRENCY_MAPPINGS).toHaveProperty(currency);
      });
    });

    it('should have string values for all mappings', () => {
      Object.values(CURRENCY_MAPPINGS).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value).toBeTruthy();
      });
    });

    it('should have proper capitalization in display names', () => {
      const displayNames = Object.values(CURRENCY_MAPPINGS);
      displayNames.forEach(name => {
        // Check that first letter is capitalized
        expect(name[0]).toMatch(/[A-Z]/);
      });
    });
  });

  describe('Constants structure', () => {
    it('should have readonly properties as const assertions', () => {
      // Test that constants exist and are properly structured
      expect(API_URLS).toBeDefined();
      expect(ADSENSE_CONFIG).toBeDefined();
      expect(SITE_CONFIG).toBeDefined();
      expect(EXTERNAL_LINKS).toBeDefined();
      expect(CURRENCY_MAPPINGS).toBeDefined();
    });
  });
});
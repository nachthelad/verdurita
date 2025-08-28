# TODO - Verdurita Improvements

## 🔒 Security & Dependencies (Critical Priority)

### Immediate Actions Required
- [x] **Update vulnerable dependencies** (Critical) ✅ COMPLETED
  - [x] Update Next.js from 14.0.4 to 15.5.2 (Critical vulnerabilities: SSRF, Cache Poisoning, DoS)
  - [x] Update axios from 1.6.2 to 1.11.0 (High: SSRF vulnerability)
  - [x] Update form-data and other vulnerable dependencies (Critical: unsafe random function)
  - [x] Run `npm audit fix` to address all vulnerabilities (0 vulnerabilities remaining)
  - [x] Build tested successfully after updates

### Security Best Practices
- [x] **Add `.env` files to `.gitignore`** ✅ COMPLETED
  - [x] Enhanced .gitignore to include all .env file variations
- [x] **Implement Content Security Policy (CSP) headers** ✅ COMPLETED
  - [x] Added comprehensive CSP headers in next.config.js
  - [x] Added X-Frame-Options, X-Content-Type-Options, and other security headers
  - [x] Configured proper sources for AdSense and external APIs
- [x] **Add rate limiting to API endpoints** ✅ COMPLETED
  - [x] Created reusable rate limiting utility (`utils/rateLimit.ts`)
  - [x] Applied 60 requests/minute limit to currencies API
  - [x] Added proper rate limit headers and error responses
- [x] **Validate and sanitize API inputs** ✅ COMPLETED
  - [x] Added method validation (GET only) for currencies API
  - [x] Implemented data validation and sanitization for all API responses
  - [x] Added XSS protection by sanitizing string inputs
  - [x] Enhanced error handling with proper validation
  - [x] Added cache headers for better performance

## 🚀 Performance Optimizations

### Core Performance Issues
- [x] **Fix React Strict Mode** ✅ COMPLETED - Enabled in `next.config.js`
- [x] **Remove unnecessary re-renders** ✅ COMPLETED
  - [x] Memoized components with `React.memo()` (CardItem)
  - [x] Used `useMemo` for expensive calculations (monedas filtering)
  - [x] Used `useCallback` for event handlers (handleFilter, cargarDatos)
- [x] **Optimize data fetching** ✅ COMPLETED
  - [x] Implemented SWR for better caching and data fetching
  - [x] Added stale-while-revalidate strategy (30s refresh interval)
  - [x] Enhanced revalidation on focus and reconnect

### Bundle Optimization
- [x] **Implement dynamic imports for components** ✅ COMPLETED
  - [x] Added dynamic imports for modal components
  - [x] Implemented proper SSR handling for client-only components
- [x] **Add bundle analyzer** ✅ COMPLETED
  - [x] Installed and configured @next/bundle-analyzer
  - [x] Added npm script `npm run analyze` for bundle analysis
- [x] **Lazy load modal components** ✅ COMPLETED
- [x] **Bundle size improvements** ✅ ACHIEVED
  - Main page size: 53.4 kB → 40.5 kB (24% reduction)
  - First Load JS: 205 kB → 192 kB (6% reduction)

### API Improvements
- [x] **Add caching headers to API responses** ✅ COMPLETED
  - [x] Added Cache-Control headers with 60s cache and 300s stale-while-revalidate
- [x] **Implement request deduplication** ✅ COMPLETED
  - [x] SWR automatically deduplicates requests (5s dedupe interval)
- [x] **Add error retry logic with exponential backoff** ✅ COMPLETED
  - [x] Implemented 3-retry strategy with exponential backoff
  - [x] Custom retry intervals with Math.pow(2, retryCount) * 1000ms
- [x] **Fixed runtime error: resultadosFiltrados.map is not a function** ✅ COMPLETED
  - [x] Replaced useMemo with useEffect for side effects
  - [x] Added safety checks with `(resultadosFiltrados || [])` in MainContainer
  - [x] Ensured proper array initialization and handling

## 🎨 UI/UX Enhancements

### Mobile Experience
- [ ] **Improve pull-to-refresh UX**
  - Add visual feedback during refresh
  - Implement proper loading states
- [ ] **Enhance card interactions**
  - Add haptic feedback on mobile
  - Improve touch targets (minimum 44px)
- [ ] **Better responsive design**
  - Fix marginTop responsive values in `pages/index.tsx:57`
  - Implement proper breakpoints

### Visual Design
- [ ] **Consistent spacing system**
  - Define spacing tokens in theme
  - Replace hardcoded margins/paddings
- [ ] **Improve color accessibility**
  - Ensure proper contrast ratios
  - Add dark mode support
- [ ] **Better loading states**
  - Replace basic Skeleton with custom loading animations
  - Add shimmer effects

### User Experience
- [ ] **Add search/filter functionality**
  - Implement real-time search
  - Add filter by currency type
- [ ] **Improve calculator UX**
  - Add currency swap button
  - Save user preferences
  - Add calculation history
- [ ] **Add error boundaries**
  - Graceful error handling
  - User-friendly error messages

## 🔧 Code Quality & Architecture

### Type Safety
- [ ] **Fix TypeScript errors**
  - Resolve missing axios types
  - Fix React types import
  - Add proper types for MUI components
  - Fix Layout component children prop issue

### Code Organization
- [ ] **Implement proper error handling**
  - Add error boundaries
  - Centralize error logging
  - Remove console.log statements
- [ ] **Extract constants**
  - Move hardcoded values to constants file
  - Centralize API URLs
- [ ] **Add proper prop validation**
  - Use TypeScript interfaces consistently
  - Add JSDoc comments for complex components

### Testing & Quality
- [ ] **Add testing infrastructure**
  - Set up Jest and React Testing Library
  - Add unit tests for utilities
  - Add integration tests for API
- [ ] **Add linting and formatting**
  - Configure ESLint rules
  - Add Prettier configuration
  - Set up pre-commit hooks

## 📱 PWA & Offline Experience

### PWA Enhancements
- [ ] **Improve offline capabilities**
  - Cache currency data locally
  - Add offline indicators
  - Implement background sync
- [ ] **Enhance app manifest**
  - Add proper app icons for all sizes
  - Improve app metadata
  - Add proper shortcuts

## 🔄 Data Management

### State Management
- [ ] **Implement proper state management**
  - Consider Zustand or Context for global state
  - Separate business logic from UI components
  - Add persistent state for user preferences

### Caching Strategy
- [ ] **Implement smart caching**
  - Cache currency data with TTL
  - Implement background refresh
  - Add cache invalidation strategies

## 🚀 Features & Enhancements

### New Features
- [ ] **Add currency comparison tool**
- [ ] **Implement price alerts/notifications**
- [ ] **Add historical data charts**
- [ ] **Currency converter with multiple currencies**
- [ ] **Add favorites/bookmarks system**

### Analytics & Monitoring
- [ ] **Add proper analytics**
  - User interaction tracking
  - Performance monitoring
  - Error tracking
- [ ] **Add monitoring dashboard**
  - API response times
  - Error rates
  - User engagement metrics

## 📊 SEO & Meta

### SEO Improvements
- [ ] **Improve meta tags**
  - Dynamic meta descriptions
  - Proper Open Graph tags
  - Add JSON-LD structured data
- [ ] **Add sitemap generation**
- [ ] **Implement proper robots.txt**

## 🛠️ Developer Experience

### Development Tools
- [ ] **Add development scripts**
  - Type checking script
  - Bundle analysis
  - Performance auditing
- [ ] **Improve documentation**
  - Add component documentation
  - API documentation
  - Setup and deployment guides

---

## Priority Levels:
- **🔴 Critical**: Security vulnerabilities and broken functionality
- **🟡 High**: Performance issues and major UX problems  
- **🔵 Medium**: Code quality and new features
- **⚪ Low**: Nice-to-have improvements

## Estimated Timeline:
- **Week 1**: Security fixes and critical performance issues
- **Week 2-3**: UI/UX improvements and code quality
- **Week 4+**: New features and enhancements
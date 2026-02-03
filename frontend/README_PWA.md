# RuralEdu - PWA Setup Guide

## ✅ Completed Features

### 1. **PWA Infrastructure**
- ✅ Service Worker (`/public/sw.js`) - Handles offline caching
- ✅ Web App Manifest (`/public/manifest.json`) - Makes app installable
- ✅ Service Worker Registration - Auto-registers on page load
- ✅ Offline Page - Shows when user is offline

### 2. **Home Page** (`/home`)
- ✅ Course listings with download functionality
- ✅ Progress tracking (localStorage)
- ✅ Day streak counter
- ✅ Online/Offline status indicator
- ✅ Install prompt for PWA
- ✅ Lightweight, minimal UI

### 3. **Course & Lesson Viewer** (`/course/[courseId]`)
- ✅ Multi-section lessons with key points
- ✅ Interactive quiz system
- ✅ Immediate feedback with explanations
- ✅ Results screen (70% pass threshold)
- ✅ Progress persistence in localStorage
- ✅ Smooth navigation between lessons

### 4. **Offline Capabilities**
- ✅ Service Worker caches static assets
- ✅ Network-first strategy with cache fallback
- ✅ IndexedDB utilities for course storage (ready to use)
- ✅ localStorage for progress tracking
- ✅ Works fully offline after initial load

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Add PWA Icons
Create two icon files in `/public`:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

See `/public/ICONS_README.md` for details.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Test PWA Features
1. Open `http://localhost:3000`
2. Navigate to `/home`
3. Open DevTools → Application → Service Workers (verify registration)
4. Test offline mode (DevTools → Network → Offline)
5. Try installing the app (browser will show install prompt)

## 📱 PWA Installation

### Desktop (Chrome/Edge)
- Look for install icon in address bar
- Or: Menu → "Install RuralEdu"

### Mobile (Android)
- Chrome will show "Add to Home Screen" prompt
- Or: Menu → "Add to Home Screen"

### iOS (Safari)
- Tap Share button → "Add to Home Screen"
- Note: iOS requires manual installation (no automatic prompt)

## 🔧 Configuration

### Service Worker Cache Strategy
- **Static Assets**: Cached on install
- **API/Pages**: Network-first, cache fallback
- **Offline**: Shows offline page for navigation requests

### Storage
- **localStorage**: Progress, streaks, course status
- **IndexedDB**: Course content (ready, not yet integrated)
- **Cache API**: Static assets via Service Worker

## 📝 Next Steps

1. **Add Real Icons**: Replace placeholder icons with actual RuralEdu branding
2. **Integrate IndexedDB**: Use `src/lib/indexeddb.ts` to store course content
3. **Add More Courses**: Expand course data in `/course/[courseId]/page.tsx`
4. **Background Sync**: Implement sync when connection restored
5. **Push Notifications**: Optional - for course updates

## 🐛 Troubleshooting

### Service Worker Not Registering
- Check browser console for errors
- Ensure HTTPS (or localhost for development)
- Clear browser cache and reload

### Install Prompt Not Showing
- Ensure manifest.json is valid
- Check that icons exist
- Verify service worker is registered
- Some browsers require user interaction first

### Offline Mode Not Working
- Verify service worker is active (DevTools → Application)
- Check cache storage (DevTools → Application → Cache Storage)
- Ensure assets are being cached

## 📚 Resources

- [MDN: Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Next.js: PWA Guide](https://nextjs.org/docs/app/building-your-application/optimizing/pwa)

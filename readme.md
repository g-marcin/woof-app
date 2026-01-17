# 🐕 Woof App - Frontend

A modern React web application for exploring dog breeds with advanced search, image galleries, theme switching, and multi-language support. Built with React 19, TypeScript, Vite, and Tailwind CSS.

**Live Demo:** https://app.mgrzmil.dev/

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Configuration](#-setup--configuration)
- [Development](#-development)
- [Building](#-building)
- [Architecture](#-architecture)
- [Component Guide](#-component-guide)
- [Styling](#-styling)
- [Internationalization](#-internationalization)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (recommended: 18+)
- npm or yarn

### Installation & Setup

```bash
# Navigate to the project directory
cd woof-app

# Install dependencies
npm install

# Create .env file with backend URLs
cp .env.example .env

# Edit .env with your API endpoints
nano .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Environment Configuration

Create `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
VITE_IMAGE_RESIZER_URL=http://localhost:8001
```

---

## ✨ Features

### User Features
- ✅ **Dog Breed Search** - Search with autocomplete and instant results
- ✅ **Image Gallery** - Browse dog breed images with thumbnail grid
- ✅ **Random Dog Viewer** - Get surprised with random dog images
- ✅ **Image Modal** - Click any image to view in full modal with zoom
- ✅ **Breed Details** - View detailed information about each breed
- ✅ **Sub-breeds** - Explore specific breed variants

### Interface Features
- ✅ **Dark/Light Theme** - Toggle between theme modes with one click
- ✅ **Multi-language Support** - English and Polish translations
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Touch-friendly** - Mobile-optimized interactions
- ✅ **Fast Navigation** - React Router for instant page transitions

### Developer Features
- ✅ **TypeScript** - Full type safety
- ✅ **Custom Hooks** - Reusable logic patterns
- ✅ **ESLint** - Code quality enforcement
- ✅ **Prettier** - Code formatting
- ✅ **Hot Module Replacement** - Instant dev updates

---

## 📚 Tech Stack

### Core
- **React** 19 - UI library with latest hooks
- **TypeScript** 5 - Type-safe JavaScript
- **Vite** 7 - Lightning-fast build tool
- **React Router** 7 - Client-side routing

### State & Data
- **Axios** - HTTP client with interceptors
- **i18next** - Internationalization framework

### Styling
- **Tailwind CSS** 4 - Utility-first CSS framework
- **CSS Modules** - Component-scoped styling
- **CSS Variables** - Theme management

### Tools & Dev
- **ESLint** - Linting and code quality
- **Prettier** - Code formatting
- **Firebase** - Hosting platform

---

## 📁 Project Structure

```
woof-app/
│
├── src/                                    # Source code
│   │
│   ├── main.tsx                           # React entry point
│   ├── App.tsx                            # Root component
│   │
│   ├── modules/                           # Feature pages
│   │   ├── DogDetails/                   # Breed details page
│   │   │   ├── DogMain.tsx               # Main breed view
│   │   │   ├── DogIntro.tsx              # Intro section
│   │   │   ├── DogGallery.tsx            # Image gallery
│   │   │   ├── DogRandom.tsx             # Random images
│   │   │   ├── DogVariantLink.tsx        # Sub-breed links
│   │   │   └── DogDetails.module.css
│   │   │
│   │   ├── DogSearch/                    # Search page
│   │   │   ├── Search.tsx                # Main search component
│   │   │   ├── Searchbar.tsx             # Search input
│   │   │   ├── ModeNavigation.tsx        # View mode toggle
│   │   │   ├── RandomDogImage/           # Random viewer
│   │   │   ├── ImageModal/               # Image modal viewer
│   │   │   ├── DogError.tsx              # Error handling
│   │   │   └── DogSearch.module.css
│   │   │
│   │   ├── Listing.tsx                   # Breeds listing page
│   │   ├── Start.tsx                     # Home/start page
│   │   ├── Readme.tsx                    # About/readme page
│   │   │
│   │   └── index.ts                      # Module exports
│   │
│   ├── components/                        # Reusable components
│   │   ├── Loader.tsx                    # Loading spinner
│   │   ├── LanguageToggle.tsx            # Language switcher
│   │   ├── ThemeToggle.tsx               # Dark/light toggle
│   │   │
│   │   ├── Autocomplete/
│   │   │   ├── Autocomplete.tsx          # Search autocomplete
│   │   │   └── Autocomplete.module.css
│   │   │
│   │   ├── Tag/
│   │   │   ├── Tag.tsx                   # Badge component
│   │   │   └── Tag.module.css
│   │   │
│   │   ├── DogVariantTags/
│   │   │   ├── DogVariantsTags.tsx       # Variant display
│   │   │   └── DogVariantsTags.module.css
│   │   │
│   │   └── index.ts                      # Component exports
│   │
│   ├── layout/                            # Layout components
│   │   ├── Layout.tsx                    # Main layout wrapper
│   │   ├── Header/
│   │   │   ├── Header.tsx                # Header section
│   │   │   └── Header.module.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx                # Navigation bar
│   │   │   └── Navbar.module.css
│   │   ├── MainWrapper/
│   │   │   ├── MainWrapper.tsx           # Main content wrapper
│   │   │   └── MainWrapper.module.css
│   │   ├── PageWrapper/
│   │   │   ├── PageWrapper.tsx           # Page container
│   │   │   └── PageWrapper.module.css
│   │   │
│   │   └── index.ts                      # Layout exports
│   │
│   ├── router/                            # Routing configuration
│   │   ├── AppRouter.tsx                 # Route definitions
│   │   ├── ErrorPage.tsx                 # Error boundary
│   │   └── index.ts                      # Router exports
│   │
│   ├── services/                          # API services
│   │   ├── axiosClient.ts                # Axios configuration
│   │   ├── dogApi.ts                     # Dog API endpoints
│   │   ├── imageResizer.ts               # Image resizer integration
│   │   └── index.ts                      # Service exports
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── useDogList.ts                 # Fetch dog breeds
│   │   ├── useDogDetails.ts              # Fetch breed details
│   │   ├── useDogImages.ts               # Fetch breed images
│   │   ├── useTheme.ts                   # Theme management
│   │   ├── useLanguage.ts                # Language management
│   │   └── index.ts                      # Hooks exports
│   │
│   ├── common/                            # Shared utilities
│   │   ├── DogSearchContext/
│   │   │   └── DogSearchContext.tsx      # Search context provider
│   │   │
│   │   ├── constants.ts                  # App constants
│   │   ├── types.ts                      # TypeScript types
│   │   ├── utils.ts                      # Utility functions
│   │   └── index.ts                      # Common exports
│   │
│   ├── assets/                            # Static assets
│   │   ├── svg/                          # SVG icon components
│   │   │   ├── DogSolid.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── BulbSolid.tsx
│   │   │   ├── BulbRegular.tsx
│   │   │   ├── Info.tsx
│   │   │   ├── FlagEn.tsx
│   │   │   ├── FlagPl.tsx
│   │   │   ├── ShieldDogSolid.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                      # Assets exports
│   │
│   ├── i18n/                              # Internationalization
│   │   ├── config.ts                     # i18next configuration
│   │   ├── locales/
│   │   │   ├── en/
│   │   │   │   └── translation.json      # English translations
│   │   │   └── pl/
│   │   │       └── translation.json      # Polish translations
│   │   │
│   │   └── index.ts                      # i18n exports
│   │
│   ├── styles/                            # Global styles
│   │   ├── globals.css                   # Global CSS
│   │   ├── theme.css                     # CSS variables (theme)
│   │   ├── animations.css                # Animation keyframes
│   │   └── index.css                     # Style index
│   │
│   └── index.css                          # Root stylesheet
│
├── public/                                 # Static files (served as-is)
│   ├── vite.svg
│   ├── favicon.ico
│   └── robots.txt
│
├── package.json                           # Dependencies & scripts
├── package-lock.json                      # Dependency lock file
│
├── tsconfig.json                          # TypeScript configuration
├── vite.config.ts                         # Vite configuration
├── tailwind.config.ts                     # Tailwind CSS configuration
├── .eslintrc.json                         # ESLint configuration
├── prettier.config.js                     # Prettier configuration
│
├── .env.example                           # Environment template
├── .env                                   # Environment variables (git-ignored)
│
├── .gitignore                             # Git ignore rules
├── README.md                              # This file
│
└── scripts/
    └── install-git-hook.js                # Git hook installer
```

---

## 🔧 Setup & Configuration

### Environment Variables

Create `.env` file with backend service URLs:

```env
# API Endpoints
VITE_API_URL=http://localhost:8000
VITE_IMAGE_RESIZER_URL=http://localhost:8001

# Optional: Production URLs
# VITE_API_URL=https://api.yourdomain.com
# VITE_IMAGE_RESIZER_URL=https://images.yourdomain.com
```

### Development Environment

```env
# .env.development
VITE_API_URL=http://localhost:8000
VITE_IMAGE_RESIZER_URL=http://localhost:8001
VITE_DEBUG=true
```

### Production Environment

```env
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_IMAGE_RESIZER_URL=https://images.yourdomain.com
VITE_DEBUG=false
```

---

## 👨‍💻 Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Format code with Prettier
npm run prettier

# Install git hooks for pre-commit checks
npm run install-git-hook
```

### Development Server

```bash
npm run dev

# Server runs on http://localhost:5173
# Hot Module Replacement (HMR) enabled
# Open in browser automatically (optional)
```

### Code Quality

```bash
# Linting with ESLint
npm run lint

# Formatting with Prettier
npm run prettier

# Both together
npm run lint && npm run prettier
```

---

## 🏗️ Building

### Production Build

```bash
# Compile TypeScript and bundle with Vite
npm run build

# Output generated in: ./dist/
# Ready for deployment
```

### Preview Build Locally

```bash
# Start local preview of production build
npm run preview

# Accessible at: http://localhost:5173
# Useful for testing before deployment
```

### Build Output

```
dist/
├── index.html              # Entry HTML
├── assets/
│   ├── index-*.js         # Main bundle
│   ├── module-*.js        # Lazy-loaded modules
│   └── styles-*.css       # Compiled styles
└── favicon.ico
```

---

## 🏛️ Architecture

### React Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── LanguageToggle
│   │   └── ThemeToggle
│   │
│   ├── Navbar
│   │   ├── HomeLink
│   │   ├── ListingLink
│   │   └── ReadmeLink
│   │
│   └── MainWrapper
│       └── Routes
│           ├── Start (/)
│           ├── Listing (/listing)
│           ├── DogDetails (/breed/:breed)
│           ├── DogSearch (/search)
│           ├── Readme (/readme)
│           └── ErrorPage (404)
```

### Data Flow

```
Component
    ↓
Custom Hook (useDogList, etc.)
    ↓
Axios Service (HTTP client)
    ↓
Backend API (dog-api)
```

### State Management

- **React Context** - Theme, Language preferences
- **Local State** - Component-level state with useState

---

## 🧩 Component Guide

### Core Modules

#### DogDetails Module
Browse detailed information about a specific dog breed.

```typescript
// Usage
<Route path="/breed/:breed" element={<DogMain />} />

// Components
- DogMain.tsx       // Main container
- DogIntro.tsx      // Breed introduction
- DogGallery.tsx    // Image grid gallery
- DogRandom.tsx     // Random images section
- DogVariantLink.tsx // Sub-breed navigation
```

#### DogSearch Module
Search for breeds and view results.

```typescript
// Components
- Search.tsx            // Main search container
- Searchbar.tsx         // Search input with autocomplete
- ModeNavigation.tsx    // Toggle between grid/random view
- RandomDogImage.tsx    // Random image viewer
- ImageModal/           // Full-screen image modal
- DogError.tsx          // Error display
```

### Reusable Components

#### Loader
Loading indicator component.

```typescript
import { Loader } from '@/components';

<Loader /> // Shows spinning loader
```

#### Autocomplete
Search input with suggestions.

```typescript
import { Autocomplete } from '@/components';

<Autocomplete
  items={breeds}
  onSelect={handleSelect}
  placeholder="Search breeds..."
/>
```

#### Tag
Badge for displaying items.

```typescript
import { Tag } from '@/components';

<Tag label="Labrador" onClick={handleClick} />
```

---

## 🎨 Styling

### CSS Architecture

- **CSS Modules** - Component-scoped styles (`.module.css`)
- **Tailwind CSS** - Utility classes for rapid development
- **CSS Variables** - Theme management with global variables

### Theme System

Theme colors stored in CSS variables in `globals.css`:

```css
:root {
  /* Light mode */
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent: #0066cc;
  /* ... */
}

[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --accent: #3399ff;
  /* ... */
}
```

### Using Styles

```typescript
// CSS Modules
import styles from './Component.module.css';

export function Component() {
  return <div className={styles.container}>{/* ... */}</div>;
}

// Tailwind CSS
export function Button() {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{/* ... */}</button>;
}

// CSS Variables
export function Text() {
  return <p style={{ color: 'var(--text-primary)' }}>{/* ... */}</p>;
}
```

---

## 🌐 Internationalization

### Supported Languages
- **English** (en)
- **Polish** (pl)

### Translation Files

```
i18n/locales/
├── en/translation.json    # English strings
└── pl/translation.json    # Polish strings
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

export function Component() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('breeds.title')}</h1>
      <button onClick={() => i18n.changeLanguage('pl')}>
        {t('languages.polish')}
      </button>
    </div>
  );
}
```

### Language Toggle Component

```typescript
import { LanguageToggle } from '@/components';

// Integrated in Header
// Toggles between EN/PL
```

---

## 🔌 API Integration

### Axios Client Configuration

```typescript
// services/axiosClient.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
```

### Dog API Service

```typescript
// services/dogApi.ts
export const dogApi = {
  getBreeds: () => apiClient.get('/api/breeds'),
  getBreedDetails: (breed: string) => apiClient.get(`/api/breeds/${breed}`),
  getBreedImages: (breed: string, limit = 20) =>
    apiClient.get(`/api/breeds/${breed}/images`, { params: { limit } }),
  getRandomImages: (breed: string, count = 5) =>
    apiClient.get(`/api/breeds/${breed}/images/random`, { params: { count } })
};
```

### Image Resizer Integration

```typescript
// services/imageResizer.ts
export const getResizedImageUrl = (path: string, width: number, height: number) => {
  const baseUrl = import.meta.env.VITE_IMAGE_RESIZER_URL;
  return `${baseUrl}/images/${path}-${width}-${height}.jpg`;
};
```

### Custom Hooks Pattern

```typescript
// hooks/useDogList.ts
import { useQuery } from '@tanstack/react-query';
import { dogApi } from '@/services';

export function useDogList() {
  return useQuery({
    queryKey: ['breeds'],
    queryFn: async () => {
      const response = await dogApi.getBreeds();
      return response.data.data.breeds;
    },
    staleTime: 1000 * 60 * 60 // 1 hour
  });
}
```

---

## 🚀 Deployment

### Firebase Deployment

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase Project**
   ```bash
   firebase init hosting
   ```

3. **Build Application**
   ```bash
   npm run build
   ```

4. **Deploy to Firebase**
   ```bash
   firebase deploy --only hosting
   ```

### Production Build Checklist

- [ ] Environment variables configured for production
- [ ] All API endpoints pointing to production servers
- [ ] Build succeeds without errors: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Testing complete locally: `npm run preview`
- [ ] Code formatted: `npm run prettier`

### Performance Optimization

- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Resized via image-resizer service
- **Minification** - Vite handles production minification

---

## 🐛 Troubleshooting

### Common Issues

**Port 5173 Already in Use**
```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using port
lsof -i :5173
kill -9 <PID>
```

**Module Not Found Error**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors**
```bash
# Check backend APIs are running
# Verify VITE_API_URL and VITE_IMAGE_RESIZER_URL in .env
# Ensure backend has CORS enabled
```

**API Connection Failed**
```bash
# Check .env configuration
cat .env

# Verify backend services are running
curl http://localhost:8000/health
curl http://localhost:8001/health

# Check network tab in DevTools for actual URLs
```

**Build Fails**
```bash
# Check TypeScript errors
npm run lint

# Clear Vite cache
rm -rf .vite

# Try clean install
npm run build
```

**Images Not Loading**
```bash
# Check image-resizer service is running
# Verify VITE_IMAGE_RESIZER_URL is correct
# Check cache statistics
curl http://localhost:8001/cache/stats
```

---

## 📚 Related Services

- **[dog-api](../dog-api)** - RESTful API for breed data
- **[image-resizer](../image-resizer)** - Image optimization service
- **[Main README](../)** - Full project overview

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Create a feature branch
2. Write/update tests
3. Follow code style: `npm run prettier`
4. Check linting: `npm run lint`
5. Submit pull request

---

## 📄 License

MIT License - see LICENSE file for details

---

**Frontend | React 19 | TypeScript 5 | Vite 7 | Tailwind CSS 4**

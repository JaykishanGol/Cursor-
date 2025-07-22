# Watchlist App 🎬

A beautiful personal watchlist app for movies and TV shows with TMDB API integration, featuring a liquid glass aesthetic inspired by iOS design.

## Features

- 🔍 **Search & Discover**: Search for movies and TV shows using the TMDB API
- 📚 **Personal Watchlist**: Add movies and shows to your personal watchlist
- 📊 **Status Tracking**: Track items as "Want to Watch", "Watching", or "Watched"
- ⭐ **Rating & Notes**: Rate watched content and add personal notes
- 🎨 **Liquid Glass Design**: Beautiful glassmorphism UI with smooth animations
- 💾 **Persistent Storage**: Your watchlist is saved locally in your browser
- 📱 **Responsive**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### 1. Get TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/) and create an account
2. Go to Settings > API and request an API key
3. Copy your API key

### 2. Configure Environment

1. Copy the `.env` file and update it with your TMDB API key:
   ```bash
   cp .env .env.local
   ```
2. Edit `.env.local` and replace `your_tmdb_api_key_here` with your actual API key:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for smooth animations
- **Zustand** for state management
- **React Query** for API data fetching
- **Axios** for HTTP requests
- **Lucide React** for icons

## Design Philosophy

The app features a liquid glass aesthetic inspired by iOS design principles:

- **Glassmorphism**: Translucent glass-like surfaces with backdrop blur
- **Fluid Animations**: Smooth, natural animations that feel responsive
- **Dynamic Gradients**: Colorful gradients that shift and flow
- **Contextual Interactions**: Hover effects and micro-interactions
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── MediaCard.tsx   # Movie/TV show card component
│   ├── SearchBar.tsx   # Search functionality
│   ├── DiscoverPage.tsx # Discover/trending content
│   ├── MoviesPage.tsx  # Movies browsing
│   ├── TVShowsPage.tsx # TV shows browsing
│   └── WatchlistPage.tsx # Personal watchlist
├── services/           # API services
│   └── tmdb.ts        # TMDB API client
├── stores/            # State management
│   └── watchlistStore.ts # Watchlist state with Zustand
├── types/             # TypeScript type definitions
│   └── index.ts       # App-wide types
└── utils/             # Utility functions
```

## License

This project is open source and available under the [MIT License](LICENSE).

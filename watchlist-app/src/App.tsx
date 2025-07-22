import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { DiscoverPage } from './components/DiscoverPage';
import { MoviesPage } from './components/MoviesPage';
import { TVShowsPage } from './components/TVShowsPage';
import { WatchlistPage } from './components/WatchlistPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in older versions)
    },
  },
});

function App() {
  const [currentView, setCurrentView] = useState('discover');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'discover':
        return <DiscoverPage />;
      case 'movies':
        return <MoviesPage />;
      case 'tv':
        return <TVShowsPage />;
      case 'watchlist':
        return <WatchlistPage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout currentView={currentView} onViewChange={setCurrentView}>
        {renderCurrentView()}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;

import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import Navigation from './router/RootNavigation';
import '@react-native-firebase/app';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
};

export default App;

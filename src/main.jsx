import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import GlobalStyles from './styles/GlobalStyles';
    import { initializeSupabase } from './lib/initSupabase';

    // Initialize Supabase before rendering the app
    initializeSupabase()
      .then(() => {
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <GlobalStyles />
            <App />
          </React.StrictMode>
        );
      })
      .catch((error) => {
        console.error('Failed to initialize Supabase:', error);
        ReactDOM.createRoot(document.getElementById('root')).render(
          <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
            <h1>Failed to initialize application</h1>
            <p>Please check your internet connection and refresh the page</p>
          </div>
        );
      });

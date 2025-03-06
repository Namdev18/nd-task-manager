import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/main.css'
import App from './App.tsx'
import store from "./redux/store.ts";
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root-app')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)

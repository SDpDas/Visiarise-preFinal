import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { store } from '../src/store.js'; // Adjust the path to your store file
import App from './App.jsx';
import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';


// Render the application with StrictMode and Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <CartProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CartProvider>
  </BrowserRouter>,
);

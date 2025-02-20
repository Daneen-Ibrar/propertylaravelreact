import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import MainLayout from './Pages/Index/Layouts/MainLayout';
import '../css/app.css';

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    if (!page) {
      console.error(`Page not found: ${name}`);
      throw new Error(`Page not found: ${name}`);
    }

    // Check if the page is `Listing/Show.jsx`, exclude layout for this specific page
    if (name !== 'Listing/Show') {
      page.default.layout = page.default.layout || ((page) => <MainLayout>{page}</MainLayout>);
    }

    return page.default;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});

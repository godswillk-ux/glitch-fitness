import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        shop: 'Shop Gear',
        categories: 'Categories',
        wishlist: 'Wishlist',
        dashboard: 'Dashboard',
        admin: 'Admin Panel',
        signIn: 'Sign In',
        signOut: 'Sign Out'
      },
      home: {
        heroTitle: 'GLITCH: Elevate Your Performance.',
        heroSubtitle: 'Premium dumbbells, apparel, and fitness gear for those who refuse to settle.',
        shopNow: 'Shop Gear',
        learnMore: 'Our Mission',
        featuredProducts: 'Top Gear',
        viewAll: 'View All'
      },
      products: {
        outOfStock: 'Out of Stock',
        addToCart: 'Add to Cart',
        reviews: 'Reviews',
        noReviews: 'No reviews yet.',
        addReview: 'Add Review',
        rating: 'Rating',
        comment: 'Comment',
        submit: 'Submit'
      },
      tracking: {
        title: 'Order Tracking',
        status: 'Status',
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        trackingNumber: 'Tracking Number',
        info: 'Shipping Information'
      }
    }
  },
  es: {
    translation: {
      nav: {
        shop: 'Tienda',
        categories: 'Categorías',
        wishlist: 'Lista de deseos',
        dashboard: 'Panel de control',
        admin: 'Panel de administración',
        signIn: 'Iniciar sesión',
        signOut: 'Cerrar sesión'
      },
      home: {
        heroTitle: 'El futuro del comercio está aquí.',
        heroSubtitle: 'Experimente un viaje de compras personalizado, seguro y de alto rendimiento.',
        shopNow: 'Comprar ahora',
        learnMore: 'Saber más',
        featuredProducts: 'Productos destacados',
        viewAll: 'Ver todo'
      },
      products: {
        outOfStock: 'Agotado',
        addToCart: 'Añadir al carrito',
        reviews: 'Reseñas',
        noReviews: 'Aún no hay reseñas.',
        addReview: 'Añadir reseña',
        rating: 'Calificación',
        comment: 'Comentario',
        submit: 'Enviar'
      },
      tracking: {
        title: 'Seguimiento de pedido',
        status: 'Estado',
        pending: 'Pendiente',
        processing: 'Procesando',
        shipped: 'Enviado',
        delivered: 'Entregado',
        trackingNumber: 'Número de seguimiento',
        info: 'Información de envío'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

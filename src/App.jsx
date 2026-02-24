import React, { useState, useEffect } from 'react';
import './components/components.css';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductCarousel from './components/ProductCarousel';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Location from './components/Location';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'menu':
        return <Menu />;
      case 'location':
        return <Location />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <About />
            <ProductCarousel />
            <Testimonials />
            <Contact />
          </>
        );
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
          {renderPage()}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

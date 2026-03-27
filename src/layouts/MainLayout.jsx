import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const MainLayout = () => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    // Only trigger if the path actually changed
    if (location.pathname !== displayLocation.pathname) {
      
      // Wrapping in requestAnimationFrame or a 0ms timeout 
      // pushes the state update to the next tick, 
      // which kills the "cascading render" warning.
      const frameId = requestAnimationFrame(() => {
        setIsNavigating(true);
      });

      const timer = setTimeout(() => {
        setIsNavigating(false);
        setDisplayLocation(location);
      }, 5000); // 5 Seconds

      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timer);
      };
    }
  }, [location, displayLocation.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {isNavigating ? (
          <Loading />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
import { useState, useEffect } from 'react';
import Homepage from './Homepage';
import Project from './Project';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    if (user) setIsAuthenticated(true);
  }, []);

  const handleAuthSuccess = (userData) => {
    localStorage.setItem('authenticatedUser', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  return isAuthenticated ? (
    <Project />
  ) : (
    <Homepage onAuthSuccess={handleAuthSuccess} />
  );
}

export default App;

import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './styles/app.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;

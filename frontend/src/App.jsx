import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://gestion-gym.onrender.com/api/token/', {
        username,
        password,
      });

      // Enregistre les tokens
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      setMessage('✅ Connexion réussie !');
      setIsLoggedIn(true);
    } catch (error) {
      setMessage("❌ Identifiants incorrects ou erreur de connexion.");
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <h1>Connexion à Gestion-Gym</h1>

      {isLoggedIn ? (
        <p>{message}</p>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />

          <button type="submit">Se connecter</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

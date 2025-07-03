// src/App.jsx
<img src="/logo.jpg" alt="Logo du gym" style={{ height: '60px', marginBottom: '1rem' }} />
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import axios from 'axios'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://gestion-gym.onrender.com/api/token/', {
        username,
        password,
      })

      // Enregistre les tokens dans le localStorage
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)

      setMessage('✅ Connexion réussie !')

      // Redirige vers le tableau de bord
      navigate('/dashboard')
    } catch (error) {
      setMessage("❌ Identifiants incorrects ou erreur de connexion.")
    }
  }

  return (
    <div className="App">
      <h1>Connexion à Gestion-Gym</h1>

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

      {message && <p>{message}</p>}
    </div>
  )
}

export default App

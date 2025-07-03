import { useEffect, useState } from 'react';

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/clients/`)
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  return (
    <div>
      <h1>Liste des clients</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.nom} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

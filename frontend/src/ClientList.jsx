import { useEffect, useState } from 'react';
import axios from 'axios';

export function ClientList({ refreshTrigger }) {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem('access_token');

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://gestion-gym.onrender.com/api/clients/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [refreshTrigger]);

  return (
    <section>
      <h2>👥 Liste des clients</h2>
      {clients.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.nom}</td>
                <td>{client.prenom}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

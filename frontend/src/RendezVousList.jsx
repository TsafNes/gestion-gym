import { useEffect, useState } from 'react';
import axios from 'axios';

function RendezVousList({ rendezVous }) {
  const [clientsMap, setClientsMap] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('https://gestion-gym.onrender.com/api/clients/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const map = {};
        response.data.forEach(client => {
          map[client.id] = `${client.prenom} ${client.nom}`;
        });
        setClientsMap(map);
      } catch (error) {
        console.error("Erreur lors du chargement des clients :", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div>
      <h2>📅 Rendez-vous</h2>
      {rendezVous.length === 0 ? (
        <p>Aucun rendez-vous disponible.</p>
      ) : (
        <ul>
          {rendezVous.map(rdv => (
            <li key={rdv.id}>
              {clientsMap[rdv.client] || `Client ID: ${rdv.client}`} — {new Date(rdv.date).toLocaleString()} — {rdv.objet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RendezVousList;

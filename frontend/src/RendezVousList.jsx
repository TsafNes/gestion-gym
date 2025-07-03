import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // 💡 Assure-toi d’importer ton fichier CSS pour le style

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
    <section className="section-card">
      <h2>📅 Rendez-vous</h2>

      {rendezVous.length === 0 ? (
        <p>Aucun rendez-vous disponible.</p>
      ) : (
        <table className="table-style">
          <thead>
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Objet</th>
            </tr>
          </thead>
          <tbody>
            {rendezVous.map(rdv => (
              <tr key={rdv.id}>
                <td>{clientsMap[rdv.client] || `Client ID: ${rdv.client}`}</td>
                <td>{new Date(rdv.date).toLocaleString()}</td>
                <td>{rdv.objet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default RendezVousList;

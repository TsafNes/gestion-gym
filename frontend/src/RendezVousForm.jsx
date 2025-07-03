import { useState, useEffect } from 'react';
import axios from 'axios';

function RendezVousForm({ onSuccess }) {
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState('');
  const [objet, setObjet] = useState('');
  const [clients, setClients] = useState([]);
  const [feedback, setFeedback] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://gestion-gym.onrender.com/api/clients/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des clients :", error);
        setFeedback("❌ Erreur lors du chargement des clients.");
      }
    };
    fetchClients();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🟡 Données envoyées :", {
      client: clientId,
      date,
      objet
    });

    try {
      const response = await axios.post(
        'https://gestion-gym.onrender.com/api/rendezvous/',
        {
          client: clientId,
          date,
          objet,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Réponse backend :", response.data);
      setFeedback("✅ Rendez-vous créé avec succès !");
      setClientId('');
      setDate('');
      setObjet('');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("❌ Erreur lors de la création :", error.response?.data || error.message);
      setFeedback("❌ Échec de la création du rendez-vous.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📅 Créer un rendez-vous</h2>

      {feedback && <p style={{ color: feedback.startsWith('✅') ? 'green' : 'red' }}>{feedback}</p>}

      <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
        <option value="">Sélectionner un client</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>
            {client.prenom} {client.nom}
          </option>
        ))}
      </select>

      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Objet du rendez-vous"
        value={objet}
        onChange={(e) => setObjet(e.target.value)}
        required
      />

      <button type="submit">Ajouter</button>
    </form>
  );
}

export default RendezVousForm;

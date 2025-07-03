import { useState } from 'react';
import axios from 'axios';

function NotificationForm({ onSuccess }) {
  const [message, setMessage] = useState('');
  const [destinataireId, setDestinataireId] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gestion-gym.onrender.com/api/notifications/', {
        destinataire: destinataireId,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('');
      setDestinataireId('');
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification :", error);
    }
  };

  useState(() => {
    fetchClients();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="notification-form">
      <h2>📨 Envoyer une notification</h2>
      <select value={destinataireId} onChange={(e) => setDestinataireId(e.target.value)} required>
        <option value="">Choisir un destinataire</option>
        {clients.map(client => (
          <option key={client.id} value={client.id}>{client.prenom} {client.nom}</option>
        ))}
      </select>
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default NotificationForm;

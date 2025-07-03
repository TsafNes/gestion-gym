import { useState } from 'react';
import axios from 'axios';

function RendezVousForm({ onSuccess }) {
  const [clientId, setClientId] = useState('');
  const [date, setDate] = useState('');
  const [objet, setObjet] = useState('');
  const token = localStorage.getItem('access_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gestion-gym.onrender.com/api/rendezvous/', {
        client: clientId,
        date,
        objet,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClientId('');
      setDate('');
      setObjet('');
      onSuccess();
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rendezvous-form">
      <h2>Créer un rendez-vous</h2>
      <input
        type="text"
        placeholder="ID du client"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        required
      />
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
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default RendezVousForm;

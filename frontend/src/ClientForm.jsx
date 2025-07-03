import { useState, useEffect } from 'react';
import axios from 'axios';

function ClientForm({ onSuccess }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [editClientId, setEditClientId] = useState(null);

  const token = localStorage.getItem('access_token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = { nom, prenom, email, telephone };
      const url = `https://gestion-gym.onrender.com/api/clients/${editClientId || ''}`;
      const method = editClientId ? 'put' : 'post';

      await axios[method](url, clientData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNom('');
      setPrenom('');
      setEmail('');
      setTelephone('');
      setEditClientId(null);
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la soumission du client :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <h2>{editClientId ? '✏️ Modifier le client' : '➕ Créer un client'}</h2>
      <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
      <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
      <button type="submit">{editClientId ? 'Mettre à jour' : 'Créer'}</button>
      {editClientId && (
        <button type="button" onClick={() => setEditClientId(null)}>
          Annuler
        </button>
      )}
    </form>
  );
}

export default ClientForm;

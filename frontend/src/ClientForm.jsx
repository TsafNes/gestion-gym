import { useState, useEffect } from 'react';
import axios from 'axios';

function ClientForm({ onSuccess }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [clients, setClients] = useState([]);
  const [editClientId, setEditClientId] = useState(null);

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
      if (editClientId) {
        await axios.put(`https://gestion-gym.onrender.com/api/clients/${editClientId}/`, {
          nom,
          prenom,
          email,
          telephone,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('https://gestion-gym.onrender.com/api/clients/', {
          nom,
          prenom,
          email,
          telephone,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setNom('');
      setPrenom('');
      setEmail('');
      setTelephone('');
      setEditClientId(null);
      fetchClients();
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la soumission du client :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://gestion-gym.onrender.com/api/clients/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchClients();
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
    }
  };

  const handleEdit = (client) => {
    setNom(client.nom);
    setPrenom(client.prenom);
    setEmail(client.email);
    setTelephone(client.telephone);
    setEditClientId(client.id);
  };

  useEffect(() => {
    fetchClients();
  }, [token]);

  return (
    <>
      <form onSubmit={handleSubmit} className="client-form">
        <h2>{editClientId ? '✏️ Modifier le client' : '➕ Créer un client'}</h2>
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        <button type="submit">{editClientId ? 'Mettre à jour' : 'Créer'}</button>
        {editClientId && <button type="button" onClick={() => setEditClientId(null)}>Annuler</button>}
      </form>

      <h2>📋 Liste des clients</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.prenom} {client.nom} - {client.email}
            <button onClick={() => handleEdit(client)}>Modifier</button>
            <button onClick={() => handleDelete(client.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ClientForm;

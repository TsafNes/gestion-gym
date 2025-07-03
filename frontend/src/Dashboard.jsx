import './dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientForm from './ClientForm';
import { ClientList } from './ClientList';
import RendezVousList from './RendezVousList';
import RendezVousForm from './RendezVousForm';
import NotificationForm from './NotificationForm';
import NotificationList from './NotificationList';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rendezVous, setRendezVous] = useState([]);
  const [clients, setClients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('https://gestion-gym.onrender.com/api/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, token]);

  const fetchRendezVous = async () => {
    try {
      const response = await axios.get('https://gestion-gym.onrender.com/api/rendezvous/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("RendezVous reçus :", response.data);
      if (user?.role === 'specialiste') {
        const filtered = response.data.filter(rdv => rdv.specialiste === user.id);
        setRendezVous(filtered);
      } else {
        setRendezVous(response.data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous :", error);
      setError('❌ Erreur lors du chargement des rendez-vous.');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('https://gestion-gym.onrender.com/api/clients/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Clients reçus :", response.data);
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
      setError('❌ Erreur lors du chargement des clients.');
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://gestion-gym.onrender.com/api/notifications/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Notifications reçues :", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des notifications :", error);
      setError('❌ Erreur lors du chargement des notifications.');
    }
  };

  const fetchAllData = () => {
    fetchRendezVous();
    fetchNotifications();
    fetchClients();
  };

  useEffect(() => {
    if (user) fetchAllData();
  }, [user]);

  const handleRdvSuccess = () => {
    setMessage('✅ Rendez-vous créé avec succès !');
    fetchRendezVous();
    setTimeout(() => setMessage(''), 3000);
  };

  const handleNotifSuccess = () => {
    setMessage('✅ Notification envoyée avec succès !');
    fetchNotifications();
    setTimeout(() => setMessage(''), 3000);
  };

  const handleClientSuccess = () => {
    setMessage('✅ Client créé avec succès !');
    fetchClients();
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="dashboard">
      <h1>🎉 Bienvenue dans le tableau de bord</h1>
      <p>Vous êtes connecté en tant que <strong>{user?.role}</strong>.</p>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user?.role === 'gestionnaire' && (
        <>
          <ClientForm onSuccess={handleClientSuccess} />
          <ClientList clients={clients} onUpdate={fetchClients} />
          <RendezVousForm onSuccess={handleRdvSuccess} />
          <RendezVousList rendezVous={rendezVous} />
          <NotificationForm onSuccess={handleNotifSuccess} />
          <NotificationList notifications={notifications} />
        </>
      )}

      {user?.role === 'specialiste' && (
        <>
          <RendezVousForm onSuccess={handleRdvSuccess} />
          <RendezVousList rendezVous={rendezVous} />
        </>
      )}
    </div>
  );
}

export default Dashboard;

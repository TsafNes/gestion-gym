import { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'; // Assure-toi que ce fichier est bien importé

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('access_token');

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://gestion-gym.onrender.com/api/notifications/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications :", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <section className="section-card">
      <h2>🔔 Notifications reçues</h2>

      {notifications.length === 0 ? (
        <p>Aucune notification disponible.</p>
      ) : (
        <table className="table-style">
          <thead>
            <tr>
              <th>Destinataire</th>
              <th>Message</th>
              <th>Date d’envoi</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notif => (
              <tr key={notif.id}>
                <td>{notif.destinataire?.prenom} {notif.destinataire?.nom}</td>
                <td>{notif.message}</td>
                <td>{new Date(notif.date_envoi).toLocaleString()}</td>
                <td>{notif.lu ? '✅ Lu' : '📭 Non lu'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default NotificationList;

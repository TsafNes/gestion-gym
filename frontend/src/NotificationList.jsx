import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="notification-list">
      <h2>🔔 Notifications reçues</h2>
      <ul>
        {notifications.map(notif => (
          <li key={notif.id}>
            <strong>{notif.destinataire?.prenom} {notif.destinataire?.nom}</strong> - {notif.message} <br />
            <small>Envoyé le : {new Date(notif.date_envoi).toLocaleString()}</small>
            {notif.lu ? ' ✅' : ' 📭'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationList;

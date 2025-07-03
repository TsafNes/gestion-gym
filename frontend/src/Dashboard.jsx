import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('https://gestion-gym.onrender.com/api/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle :', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="dashboard">
      <h1>🎉 Bienvenue dans le tableau de bord</h1>
      {userInfo && (
        <>
          <p>Vous êtes connecté en tant que <strong>{userInfo.role}</strong>.</p>
          {userInfo.role === 'gestionnaire' && (
            <div>
              <button>Créer un client</button>
              <button>Voir les abonnements</button>
            </div>
          )}
          {userInfo.role === 'specialiste' && (
            <div>
              <button>Mes rendez-vous</button>
              <button>Notifications</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;

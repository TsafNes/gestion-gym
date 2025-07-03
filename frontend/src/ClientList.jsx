import { useEffect, useState } from 'react';
import axios from 'axios';

function ClientList({ clients }) {
  return (
    <div className="client-list">
      <h2>👥 Liste des clients</h2>
      {clients.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <ul>
          {clients.map(client => (
            <li key={client.id}>
              {client.prenom} {client.nom} – {client.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientList;
import React from 'react';

function RendezVousList({ rendezVous }) {
  if (!rendezVous || rendezVous.length === 0) {
    return <p>Aucun rendez-vous disponible.</p>;
  }

  return (
    <div>
      <h2>📅 Liste des Rendez-vous</h2>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Date</th>
            <th>Objet</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {rendezVous.map((rdv) => (
            <tr key={rdv.id}>
              <td>{rdv.client}</td>
              <td>{new Date(rdv.date).toLocaleString('fr-CA')}</td>
              <td>{rdv.objet || '---'}</td>
              <td>{rdv.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RendezVousList;

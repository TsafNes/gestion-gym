import React from 'react';
import ResourceList from './components/ResourceList';

function App() {
  return (
    <div className="App">
      <h1>Portail de Gestion Gym</h1>

      <ResourceList endpoint="clients" label="clients" />
      <ResourceList endpoint="gestionnaires" label="gestionnaires" />
      <ResourceList endpoint="specialistes" label="spécialistes" />
      <ResourceList endpoint="abonnements" label="abonnements" />
      <ResourceList endpoint="rendezvous" label="rendez-vous" />
      <ResourceList endpoint="notifications" label="notifications" />
    </div>
  );
}

export default App;

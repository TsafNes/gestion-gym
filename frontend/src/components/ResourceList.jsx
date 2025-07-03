import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = ({ endpoint, label }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}/`);
        setData(response.data);
      } catch (error) {
        console.error(`Erreur lors de la récupération des ${endpoint}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [endpoint]);

  if (loading) return <p>Chargement des {label}...</p>;
  if (data.length === 0) return <p>Aucun {label} trouvé.</p>;

  return (
    <div>
      <h2>{label.charAt(0).toUpperCase() + label.slice(1)}</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {Object.entries(item).map(([key, value]) => (
              <div key={key}><strong>{key}</strong>: {String(value)}</div>
            ))}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;

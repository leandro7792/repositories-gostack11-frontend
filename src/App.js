import React, { useEffect, useState } from "react";

import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function start() {
      try {
        const { data } = await api.get('repositories');

        setRepositories(data);

      } catch (error) {

        alert('We have a problem 😧');
        console.log(error);

      }
    }
    start();
  }, []);

  async function handleAddRepository() {
    try {
      const newRepositorie = {
        title: "Devops",
        url: "http://github.com/leandro7792",
        techs: ["node", "JS"]
      }

      const { data } = await api.post('repositories', newRepositorie);

      setRepositories([...repositories, data]);

    } catch (error) {

      alert('We have a problem 😧');
      console.log(error);

    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const filtered = repositories.filter(repo => repo.id !== id);

      setRepositories(filtered);

    } catch (error) {

      alert('We have a problem 😧');
      console.log(error);

    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map(repositorie => (
            <li key={repositorie.id}>
              {repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React, { 
  useState,
  useCallback,
} from 'react';
import './App.css';
import User from './components/user';
import UserList from './components/UserList';

/**
 *  Imutabilidade:
 *    -> O State da aplicação nunca é alterado. SEMPRE RECRIADO!
 *    -> O React realiza uma comparação entre o antigo State e o  novo State;
 *  Fluxo de renderização:
 *    -> Toda vez que há alteração do State || em uma propriedade || no componente pai, haverá uma nova renderização;
 */

// Implementar a performace de uma aplicação React implica a dizer em lidar com o Fluxo de renderização, evitando renderizações desnecessárias!

const App: React.FC = () => {
  const [ users, setUsers ] = useState<User[]>([
      { id: Math.random(), username: 'William', age: Math.round(Math.random() * 10) },
      { id: Math.random(), username: 'Felipe', age: Math.round(Math.random() * 10) },
  ])
  const [ username, setUsername ] = useState<string>('')
  const [ age, setAge ] = useState<number>(0)
  /**
   *  useCallback:
   *    -> funcionamento semelhante ao do useMemo, porém ao invés de memorizar valores, memoriza funções para reutilizá-las caso nenhuma dependência seja atualizada, evitando a recriação da função durante o Fluxo de Renderizações; 
   */

  const createUser = useCallback(() => {
    if (username) {
      setUsers([{ id: Math.random(), username: username, age}, ...users])
      setUsername('')
      setAge(0)
    }
  }, [username, age, users])

  return (
    <div className="App">
      <section className="user-grid">
        <UserList Users={users}/>
      </section>
      <section className="form">
        <article id="username">
          <label>Name</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </article>
        <article id="age">
          <label>Age</label>
          <input
            value={age}
            type="number"
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </article>
        <button onClick={createUser}>Create</button>
      </section>
    </div>
  )
};

export default App;
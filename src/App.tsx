import React, { 
  useState,
  useMemo,
  useCallback
} from 'react';
import './App.css'

/**
 *  Imutabilidade:
 *    -> O State da aplicação nunca é alterado. SEMPRE RECRIADO!
 *    -> O React realiza uma comparação entre o antigo State e o  novo State;
 *  Fluxo de renderização:
 *    -> Toda vez que há alteração do State || em uma propriedade || no componente pai, haverá uma nova renderização;
 */

// Implementar a performace de uma aplicação React implica a dizer em lidar com o Fluxo de renderização, evitando renderizações desnecessárias!

interface User {
  id: number,
  username?: string;
  groups?: number;
}

interface UserProps {
  user: User
}

/**
 *  React.memo:
 *    -> Memoriza um React Component e antes de renderizar todo o HTML da página, verifica se houve atualização no component. Ele evita centenas de renderizações indesejadas, principalmente tratando de pequenos componentes que criamos para renderizar uma foto, por exemplo, com uma estilização;
 */

const UserGroups: React.FC<UserProps> = React.memo(({ user }) => {
  /**
   *  useMemo:
   *    -> Memorizar um valor* dentro do component para que seja atualizado apenas quando o array de dependências mudar
   *    *valor:
   *      -> informações que não provem diretamente da api; as quais são obtidas através dos métodos comuns do javascript em cima de um tipo de variável.
   *  
   */
  const totalGroups = useMemo(() => user.groups, [user])

  return (
    <>
      <strong>Total de grupos: {totalGroups}</strong>
    </>
  )
})

const App: React.FC = () => {
  const [ users, setUsers ] = useState<Array<User>>([
    { id: Math.random(), username: 'William', groups: Math.round(Math.random() * 10) },
    { id: Math.random(), username: 'Felipe', groups: Math.round(Math.random() * 10) },
  ])
  const [ username, setUsername ] = useState<string>('')
  const [ groups, setGroups ] = useState<number>(0)
  /**
   *  useCallback:
   *    -> funcionamento semelhante ao do useMemo, porém ao invés de memorizar valores, memoriza funções para reutilizá-las caso nenhuma dependência seja atualizada, evitando a recriação da função durante o Fluxo de Renderizações; 
   */

  const createUser = useCallback(() => {
    if (username) {
      setUsers([{ id: Math.random(), username: username, groups}, ...users])
      setUsername('')
      setGroups(0)
    }
  }, [username, groups, users])

  return (
    <div className="App">
      <section className="user-grid">
        { users?.map(user => (
          <section key={user.id} id="user-container">
            <h1>{user.username}</h1>
            <UserGroups user={user}/>
          </section>
        )) }
      </section>
      <section className="form">
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="groups"
          value={groups}
          type="number"
          onChange={(e) => setGroups(Number(e.target.value))}
        />
        <button onClick={createUser}>Create</button>
      </section>
    </div>
  )
};

export default App;
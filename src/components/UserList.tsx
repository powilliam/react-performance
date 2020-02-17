import React from 'react';

import User from './user';
import Age from './Age';

interface Props {
    Users?: User[]
}

  
/**
 *  React.memo:
 *    -> Memoriza um React Component e antes de renderizar todo o HTML da página, verifica se houve atualização no component. Ele evita centenas de renderizações indesejadas, principalmente tratando de pequenos componentes que criamos para renderizar uma foto, por exemplo, com uma estilização;
 */

const UserList: React.FC<Props> = ({ Users }) => {
    return (
        <>
            { Users?.map(user => (
                <section key={user.id} id="user-container">
                    <h1>{user.username}</h1>
                    <Age user={user}/>
                </section>
            )) }
        </>
    )
}

export default React.memo(UserList)
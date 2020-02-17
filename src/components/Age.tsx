import React, { useMemo } from 'react';
import User from './user';

interface Props {
    user: User
}

const Age: React.FC<Props> = ({ user }) => {
    /**
     *  useMemo:
     *    -> Memorizar um valor* dentro do component para que seja atualizado apenas quando o array de dependências mudar
     *    *valor:
     *      -> informações que não provem diretamente da api; as quais são obtidas através dos métodos comuns do javascript em cima de um tipo de variável.
     *  
     */
    const userage = useMemo(() => user.age, [user])
  
    return (
      <>
        <strong>{userage} years old</strong>
      </>
    )
}

export default Age
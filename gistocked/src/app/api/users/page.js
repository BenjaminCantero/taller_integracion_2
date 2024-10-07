import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.role}
            <button onClick={() => router.push(`/users/edit/${user.id}`)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;

import React, { useEffect, useState, useContext } from 'react';
import { getUsers } from '../service/Api'; // Importa la función para obtener usuarios
import { AuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación
import { FaUsers } from 'react-icons/fa'; // Asegúrate de importar el ícono que deseas usar

const UserCard = () => {
  const { role } = useContext(AuthContext); // Obtiene el rol del usuario desde el contexto
  const [userCount, setUserCount] = useState(0); // Estado para almacenar el número de usuarios

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers(); // Llama a la API para obtener usuarios
        setUserCount(users.length); // Actualiza el estado con el número de usuarios
        console.log(users.length);
      } catch (error) {
        console.error("Error fetching users:", error); // Manejo de errores
      }
    };

    fetchUsers();
  }, []);

  // Solo muestra la tarjeta si el rol es 'admin'
  if (role !== 'admin') {
    return null; // No renderiza nada si no es admin
  }

  return (
    <div className="ContentCards bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full max-w-xs">
      <div>
        <h3 className="text-gray-500 text-xs">Usuarios Registrados</h3>
        <p className="text-lg font-bold text-gray-800">{userCount}</p>
      </div>
      <FaUsers className="text-blue-500 text-2xl" />
    </div>
  );
};

export default UserCard;

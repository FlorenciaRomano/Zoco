import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sideBar';
import UserProfileForm from '../components/userForm';
import UsersTable from '../components/usersTable'; // Asegúrate de importar UsersTable
import { useNavigate } from 'react-router-dom';
import { getUsers  } from '../service/Api';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [userRole, setUserRole] = useState('admin'); // 'admin' o 'user'
  const [users, setAllUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const simulatedUserData = JSON.parse(localStorage.getItem('user'));
    
    if (!simulatedUserData) {
      navigate('/login'); // Redirige a login si no hay datos
      return;
    }

    setUserData(simulatedUserData); // Establece los datos del usuario
    setUserRole(simulatedUserData.role); // Establece el rol del usuario
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await getUsers();
        setAllUsers(apiUsers);
        setUserCount(apiUsers.length);
        console.log(apiUsers.length)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = (updatedData) => {
    console.log('Datos actualizados:', updatedData);
    setUserData(updatedData); // Actualiza el estado con los nuevos datos
    localStorage.setItem('user', JSON.stringify(updatedData)); // Guarda los datos en localStorage
    alert('Datos guardados correctamente');
  };

  const handleUserAdded = (newUser ) => {
    setAllUsers((prevUsers) => [...prevUsers, newUser ]); // Agrega el nuevo usuario a la lista
    setUserCount((prevCount) => prevCount + 1); // Incrementa el contador de usuarios
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8 space-y-6">
        {userRole === 'admin' && (
          <>
            <h1 className="text-2xl font-bold mt-8">Panel de Administración</h1>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-white rounded-lg shadow-md p-2 flex flex-col items-center justify-center h-32 w-full md:w-64">
                  <h2 className="text-lg font-semibold mb-2">Cantidad de Usuarios</h2>
                  <p className="text-3xl font-bold text-blue-600">{userCount}</p>
                </div>
              
                <div className="w-full md:w-1/2">
                  <UserProfileForm userData={userData} onUpdate={handleUpdate} />
                </div>
              </div>
            </div>
          </>
        )}
        {userRole === 'user' && (
          <div className="max-w-4xl mx-auto">
            <UserProfileForm userData={userData} onUpdate={handleUpdate} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sideBar';
import { useNavigate } from 'react-router-dom';
import { getUsers, addUser  } from '../service/Api'; // Asegúrate de que addUser  esté importado
import UserModal from '../components/userModal';
import AddUserForm from '../components/addUserForm';
import UsersTable from '../components/usersTable';


const UserManagement = () => {
    const [userCount, setUserCount] = useState(0);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState('admin');
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const simulatedUserData = JSON.parse(localStorage.getItem('user'))
            ? JSON.parse(localStorage.getItem('user'))
            : navigate('/usuarios');
        setUserData(simulatedUserData);
        setUserRole(simulatedUserData.role);
    }, [navigate]);

    useEffect(() => {
        getUsers().then(users => {
            setAllUsers(users);
            setUserCount(users.length);
        });
    }, []);

   

    const filteredUsers = allUsers.filter(user =>
        user.nombre && user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email && user.mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.telefono && user.telefono.includes(searchTerm)) ||
        user.estudios && user.estudios.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <main className="flex-1 p-5 md:p-8 space-y-6 overflow-hidden">
                {userRole === 'admin' && (
                    <>
                        <h1 className="text-2xl font-bold mt-8">Gestión de Usuarios</h1>

                        {/* Pasa los usuarios filtrados a la tabla */}
                        <UsersTable users={filteredUsers} />
                    </>
                )}
            </main>
        </div>
    );
};

export default UserManagement;

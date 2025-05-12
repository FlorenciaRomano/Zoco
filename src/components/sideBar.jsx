import React, { useState, useContext } from 'react';
import { FaUser , FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de importar el contexto

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext); // Obtener el usuario del contexto

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Botón hamburguesa fijo arriba izquierda en móvil */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md text-gray-700 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        &#9776;
      </button>

      {/* Sidebar que ocupa todo el alto */}
      <aside
        className={`
          fixed top-0 left-0 h-screen .w-40 bg-white shadow-md p-6 z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:flex md:flex-col
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Aquí agregamos un padding superior extra en mobile para que el botón no tape el contenido */}
        <div className="md:mt-0 mt-16 flex flex-col h-full">
          <h2 className="text-xl font-semibold mb-10">
            {user?.role === 'user' ? 'Zoco' : 'Admin Panel'}
          </h2>
          <nav className="space-y-6 flex flex-col">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full text-left"
              onClick={() => {setIsMenuOpen(true);
                navigate('/dashboard')
              }}
            >
              <FaHome />
              <span>Inicio</span>
            </button>
            {/* Mostrar el botón de "Usuarios" solo si el rol es "admin" */}
            {user?.role === 'admin' && (
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 w-full text-left"
                onClick={() => 
                    {setIsMenuOpen(false);
                         navigate('/usuarios')}}
              >
                <FaUser  />
                <span>Usuarios</span>
              </button>
            )}
            <button
              className="flex items-center space-x-2 text-red-500 hover:text-red-700 mt-auto w-full text-left"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              <FaSignOutAlt />
              <span>Cerrar sesión</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

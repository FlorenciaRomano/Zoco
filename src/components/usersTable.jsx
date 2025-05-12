import { useEffect, useState } from 'react';
import { getUsers, addUser, deleteUsers, updateUser } from '../service/Api';
import Swal from 'sweetalert2'


const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    telefono: '',
    estudios: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
        localStorage.setItem('users', JSON.stringify(response));
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    setError('');
    if (
      !newUser.nombre.trim() ||
      !newUser.email.trim() ||
      !newUser.estudios.trim() ||
      !newUser.role.trim() ||
      !newUser.password ||
      !newUser.confirmPassword
    ) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    
    }
    try {
      await addUser(newUser);
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setModalVisible(false);
      setNewUser({
        nombre: '',
        email: '',
        telefono: '',
        estudios: '',
        role: '',
        password: '',
        confirmPassword: '',
      });
      Swal.fire({
        title: "Guardado!",
        icon: "success",
        draggable: true
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "no se pudo",
      });
    }

  };

  // const deleteUser = async (id) => {
  //   if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
  //     await deleteUser(id);
  //     const updatedUsers = await getUsers();
  //     setUsers(updatedUsers);
  //     if (editUserId === id) {
  //       cancelEdit();
  //     }
  //   }
  // };

  const handleEditUser = () => {
    setError('');
    if (
      !newUser.nombre.trim() ||
      !newUser.email.trim() ||
      !newUser.estudios.trim() ||
      !newUser.role.trim()
    ) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    const updatedUsers = users.map((user) =>
      user.email === selectedUser.email ? newUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditModalVisible(false);
    setSelectedUser(null);
    setNewUser({
      nombre: '',
      email: '',
      telefono: '',
      estudios: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleDeleteUser = async (email) => {
    try {
      await deleteUsers(email) 
      const updatedUsers = users.filter((user) => user.email !== email);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      Swal.fire({
        title: "Eliminó!",
        icon: "success",
        draggable: true
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Salio mal",
      });
    }
 
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setViewModalVisible(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setNewUser({ ...user, password: '', confirmPassword: '' });
    setEditModalVisible(true);
  };

  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      {/* Search input and Add user button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/4 sm:w-1/5 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setModalVisible(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Agregar Usuario
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow bg-white border border-gray-50">
        <table className="min-w-full table-fixed outline-gray border-2 border-solid border-gray-150">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left text-xs sm:text-sm truncate">Nombre</th>
              <th className="p-2 text-left text-xs sm:text-sm truncate">Email</th>
              <th className="p-2 text-left text-xs sm:text-sm hidden sm:table-cell truncate">Teléfono</th>
              <th className="p-2 text-left text-xs sm:text-sm hidden lg:table-cell truncate">Estudios</th>
              <th className="p-2 text-left text-xs sm:text-sm hidden md:table-cell truncate">Rol</th>
              <th className="p-2 text-left text-xs sm:text-sm truncate">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 text-xs sm:text-sm truncate max-w-[120px]">{user.nombre}</td>
                  <td className="p-2 text-xs sm:text-sm truncate max-w-[160px]">{user.email}</td>
                  <td className="p-2 text-xs sm:text-sm hidden sm:table-cell truncate max-w-[120px]">{user.telefono || '-'}</td>
                  <td className="p-2 text-xs sm:text-sm hidden lg:table-cell truncate max-w-[140px]">{user.estudios}</td>
                  <td className="p-2 text-xs sm:text-sm hidden md:table-cell capitalize truncate max-w-[100px]">{user.role}</td>
                  <td className="p-2 space-x-2 text-xs sm:text-sm whitespace-nowrap">
                    <button
                      onClick={() => openViewModal(user)}
                      className="text-blue-600 hover:underline"
                    >
                      Ver
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(user)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br rounded-lg text-sm px-2 py-1"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(user.email)}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br rounded-lg text-sm px-2 py-1"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No hay usuarios cargados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black-200  bg-opacity-25  flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalVisible(false);
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Agregar Usuario</h2>
            {error && <p className="mb-2 text-red-600">{error}</p>}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={newUser.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                name="telefono"
                value={newUser.telefono}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Estudios"
                name="estudios"
                value={newUser.estudios}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Rol"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                value={newUser.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewModalVisible && selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewModalVisible(false);
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Datos del Usuario</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Teléfono:</strong> {selectedUser.telefono || '-'}</p>
              <p><strong>Estudios:</strong> {selectedUser.estudios}</p>
              <p><strong>Rol:</strong> {selectedUser.role}</p>
            </div>
            <button
              onClick={() => setViewModalVisible(false)}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModalVisible && selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditModalVisible(false);
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
            {error && <p className="mb-2 text-red-600">{error}</p>}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditUser();
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={newUser.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                name="telefono"
                value={newUser.telefono}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Estudios"
                name="estudios"
                value={newUser.estudios}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                placeholder="Rol"
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Nueva contraseña (dejar vacía para no cambiar)"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                value={newUser.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditModalVisible(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;


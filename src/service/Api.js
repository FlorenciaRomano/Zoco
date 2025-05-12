let users = [
  {
    email: 'admin@zoco.com',
    password: 'admin123',
    role: 'admin',
    nombre: 'Admin Zoco',
    direccion: 'Calle Admin 123',
    telefono: '123456789',
    estudios: 'Ingeniería en Sistemas',
    experiencia: '5 años'
  },
  {
    email: 'user@zoco.com',
    password: 'user123',
    role: 'user',
    nombre: 'Usuario Uno',
    direccion: 'Calle Usuario 456',
    telefono: '987654321',
    estudios: 'Tecnicatura en Programación',
    experiencia: '2 años'
  },
  {
    email: 'user2@zoco.com',
    password: 'user456',
    role: 'user',
    nombre: 'Usuario Dos',
    direccion: 'Calle Usuario 789',
    telefono: '555555555',
    estudios: 'Licenciatura en Informática',
    experiencia: '3 años'
  }
]

export const loginApi = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        u => u.email === email && u.password === password
      )
      if (user) {
        const token = btoa(JSON.stringify({ email: user.email, role: user.role }))
        resolve({ token })
      } else {
        reject(new Error('Credenciales inválidas'))
      }
    }, 500)
  })
}

// Nueva función para obtener usuarios (sin passwords)
export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users.map(({ password, ...rest }) => rest))
    }, 500)
  })
}

export const getUser = async () => {
  const response = await fetch('/service/Api'); // Cambia la URL según tu API
  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  return await response.json();
};

export const addUser = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = users.find(u => u.email === user.email);
      if (exists) {
        reject(new Error('Ya existe un usuario con ese correo'));
      } else {
        users.push(user);
        console.log('Guardado')
        resolve(user);
      }
    }, 500);
  });
};

export const updateUser = (email, updatedUser) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex(u => u.email === email);
      if (index === -1) {
        reject(new Error('Usuario no encontrado'));
      } else {
        users[index] = { ...users[index], ...updatedUser };
        resolve(users[index]);
      }
    }, 500);
  });
};

export const deleteUsers = (email) => {
  console.log(email)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = users.length;
      users = users.filter(u => u.email !== email);
      if (users.length === initialLength) {
        reject(new Error('Usuario no encontrado'));
      } else {
        resolve();
      }
    }, 500);
  });
};
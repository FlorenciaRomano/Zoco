import React, { useState, useEffect } from 'react';

const initialState = {
  name: '',
  email: '',
  address: '',
  phone: '',
  studies: '',
  experience: '',
  password: '',
  confirmPassword: '',
};

const AddUserForm = ({ mode = 'create', user = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && user) {
      setFormData({ ...user, password: '', confirmPassword: '' });
    }
  }, [mode, user]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Correo inválido';

    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.studies.trim()) newErrors.studies = 'Los estudios son obligatorios';
    if (!formData.experience.trim()) newErrors.experience = 'La experiencia es obligatoria';

    if (mode === 'create') {
      if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const userToSubmit = { ...formData };
      if (mode !== 'create') delete userToSubmit.confirmPassword;
      onSubmit(userToSubmit);
    }
  };

  return (
    <div
      className="max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto"
      style={{ maxHeight: '80vh' }}
    >
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {['name', 'email', 'address', 'phone', 'studies', 'experience'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block font-xs capitalize mb-1">
              {field}
            </label>
            <input
              id={field}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoComplete="off"
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="new-password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {mode === 'create' && (
          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {mode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;

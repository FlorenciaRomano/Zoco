import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const validateForm = () => {
        const errors = {}

        if (!email.trim()) {
            errors.email = 'El correo es obligatorio'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'El correo debe tener un formato válido (ej: usuario@dominio.com)'
        }

        if (!password.trim()) {
            errors.password = 'La contraseña es obligatoria'
        } else if (password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            // Simulación de usuarios
            const users = [
                {
                    email: 'admin@zoco.com',
                    password: 'admin123',
                    role: 'admin',
                    name: 'Juan Pérez',
                    address: 'Av. Siempre Viva 123',
                    phone: '123456789',
                    studies: 'Ingeniería Informática',
                    experience: '3 años en desarrollo web',
                    isAuthenticated: true,
                    isAllowed: true,
                },
                {
                    email: 'user@zoco.com',
                    password: 'user123',
                    role: 'user',
                    address: 'Av. Avenida 456',
                    phone: '353456789',
                    name: 'Ana Gómez',
                    studies: 'Ingeniería Informática',
                    experience: '2 años en desarrollo web',
                    isAllowed: true,
                }
                ,
                {
                    email: 'user@zoco.com',
                    password: 'user123',
                    role: 'user',
                    address: 'Av. Avenida 456',
                    phone: '353456789',
                    name: 'Ana Gómez',
                    studies: 'Ingeniería Informática',
                    experience: '2 años en desarrollo web',
                    isAllowed: true,
                }
                ,
                ,
                {
                    email: 'userNoAllowed@zoco.com',
                    password: 'user123',
                    role: 'user',
                    address: 'Av. Avenida 456',
                    phone: '353456789',
                    name: 'Usuario No Permitido',
                    studies: 'Ingeniería Informática',
                    experience: '2 años en desarrollo web',
                    isAllowed: false,
                }
            ]

            const foundUser = users.find(
                (u) => u.email === email && u.password === password
            )

            if (foundUser) {
                const token = btoa(JSON.stringify(foundUser))
                console.log('foundUser', foundUser)
                // Guardar el usuario en el localStorage
                localStorage.setItem('user', JSON.stringify(foundUser))

                login(token)

                navigate('/dashboard')
            } else {
                setErrorMessage('Correo o contraseña incorrectos')
            }
        } catch (error) {
            console.error(error)
            setErrorMessage('Ocurrió un error inesperado')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Bienvenidx!</h2>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Correo electrónico
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={validateForm}
                    />
                    {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validateForm}
                    />
                    {formErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Iniciar sesión
                </button>
                <div className='mt-1 text-gray-500'>
                    <p>Usuarios</p>
                    <ul className='list-disc'>
                        <li>admin@zoco.com / admin123</li>
                        <li>user@zoco.com / user123</li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default Login
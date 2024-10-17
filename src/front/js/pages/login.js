import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        };

        try {
            const response = await fetch("/api/login", requestOptions); // URL del backend Flask
            if (!response.ok) {
                throw new Error("Inicio de sesión fallido");
            }
            const data = await response.json();
            sessionStorage.setItem("token", data.token); // Guardar token en sessionStorage
            navigate("/private"); // Redirigir a la ruta privada después de iniciar sesión
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow" style={{ backgroundColor: '#f8f9fa', maxWidth: '500px', margin: 'auto' }}>
                <h2 className="text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

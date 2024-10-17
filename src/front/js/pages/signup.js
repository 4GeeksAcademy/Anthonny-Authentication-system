import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de la contraseña
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) { // Verificación de coincidencia de contraseñas
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        };

        try {
            const response = await fetch("/api/signup", requestOptions); // URL del backend Flask
            if (!response.ok) {
                throw new Error("Registro fallido");
            }
            navigate("/login"); // Redirigir al login después del registro exitoso
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <h2 className="text-center">Registro de Usuario</h2>
                <form onSubmit={handleSubmit} className="mx-auto">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

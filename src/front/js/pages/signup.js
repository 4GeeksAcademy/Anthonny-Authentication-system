import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.some((user) => user.email === email);

        if (userExists) {
            setErrorMessage("El usuario ya existe");
            return;
        }

        const newUser = { email, password };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        navigate("/login");
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
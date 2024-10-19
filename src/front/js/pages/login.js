import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../component/sessionContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { setUserEmail } = useSession();

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = existingUsers.find((user) => user.email === email);

        if (!user || user.password !== password) {
            setErrorMessage("Credenciales incorrectas");
            return;
        }

        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("token", "fake-jwt-token");
        setUserEmail(email);
        navigate("/");
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
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../component/sessionContext";

export const Navbar = () => {
    const { userEmail, setUserEmail } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userEmail");
        setUserEmail(null);
        navigate("/");
    };

    return (
        <nav className="custom-navbar">
            <Link to="/">
                <span className="navbar-brand">Regresar a Home</span>
            </Link>
            <div className="welcome-text">
                <span>
                    {userEmail ? `Bienvenido, ${userEmail}` : "Bienvenido, invitado"}
                </span>
            </div>
            <div style={{ marginLeft: 'auto' }}>
                <Link to="/signup">
                    <button className="btn btn-primary navbar-signup">Registrarse</button>
                </Link>
                {userEmail && (
                    <button className="btn btn-danger navbar-signup" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                )}
                {!userEmail && (
                    <Link to="/login">
                        <button className="btn btn-primary navbar-signup">Iniciar Sesión</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};
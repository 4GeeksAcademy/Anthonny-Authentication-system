import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="custom-navbar">
            <Link to="/">
                <span className="navbar-brand">Regresar a Home</span>
            </Link>
            <div>
                <Link to="/signup">
                    <button className="btn btn-primary navbar-signup">Registrarse</button>
                </Link>
                <Link to="/login">
                    <button className="btn btn-primary navbar-signup">Iniciar Sesión</button>
                </Link>
            </div>
        </nav>
    );
};

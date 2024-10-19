import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../component/sessionContext";

const Private = () => {
    const navigate = useNavigate();
    const { setUserEmail } = useSession();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        } else {
            const email = sessionStorage.getItem("userEmail");
            setUserEmail(email);
        }
    }, [navigate, setUserEmail]);

    return (
        <div className="container mt-5 text-center">
            <h2>Página Privada</h2>
            <p>Este contenido solo es visible para usuarios autenticados.</p>
            <img 
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb9d4864-c5bb-46af-b834-47a5ff1d5683/d5jvugq-1f349b9d-f279-432c-accb-8a40b229ec59.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ViOWQ0ODY0LWM1YmItNDZhZi1iODM0LTQ3YTVmZjFkNTY4M1wvZDVqdnVncS0xZjM0OWI5ZC1mMjc5LTQzMmMtYWNjYi04YTQwYjIyOWVjNTkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.O22mPPbKRSZdsGn1kFS4tzyUEQ0_nK866IOaX3AjzSs"
                alt="GIF divertido"
                style={{ maxWidth: "100%", height: "auto" }} 
            />
        </div>
    );
};

export default Private;
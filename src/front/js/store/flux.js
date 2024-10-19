const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                },
            ],
            userEmail: null 
        },
        actions: {
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            login: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        console.error("Login error:", error);
                        return { success: false, message: error.message };
                    }

                    const data = await response.json();
                    setStore({ userEmail: email });
                    sessionStorage.setItem("userEmail", email);
                    sessionStorage.setItem("token", data.token);

                    return { success: true };
                } catch (error) {
                    console.error("Login request error:", error);
                    return { success: false, message: "Error en la solicitud." };
                }
            },
            signup: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        console.error("Signup error:", error);
                        return { success: false, message: error.message };
                    }

                    const data = await response.json();
                    return { success: true, message: data.message };
                } catch (error) {
                    console.error("Signup request error:", error);
                    return { success: false, message: "Error en la solicitud." };
                }
            }
        }
    };
};

export default getState;

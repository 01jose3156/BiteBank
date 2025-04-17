import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../styles/Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    apiRequest("/users/profile", "GET", null, token)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("No se pudo cargar el perfil");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="home-container-wrapper">Cargando usuario...</div>;
  }

  if (error) {
    return <div className="home-container-wrapper error">{error}</div>;
  }

  return (
    <div className="home-container-wrapper">
      {user ? (
        <div>
          <h2>Bienvenido, {user.fullName}!</h2>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <p>No se pudo cargar la información del usuario. <a href="/login">Iniciar sesión</a></p>
      )}
    </div>
  );
};

export default Home;
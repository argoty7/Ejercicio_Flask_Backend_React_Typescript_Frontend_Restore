/** Autor: Camilo Enrique Argoty Pulido*/
/** Fecha: 2023-09-14 */
/** Descripción: Frontend basado en React usando el lenguaje Typescript */ 

/** Importar librerías */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/** Definición de interfaz de usuario */
interface UserProfile {
  username: string;
  email: string;
}

/** Función de aplicación */
function App() {
  /** Definición de estados iniciales para username, email, password, loggedIn, profile */
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  /** Función de efecto para verificar el estado de inicio de sesión */
  useEffect(() => {
    checkLoginStatus();
  }, []);

  /** Función de verificación de estado de inicio de sesión */
  const checkLoginStatus = async () => {
    try {
      /** Obtener perfil de usuario */
      const response = await axios.get<UserProfile>('/profile');

      /** Si el perfil de usuario existe, establecer loggedIn en true y profile en response.data */
      setProfile(response.data);
      setLoggedIn(true);
    } catch (error) {
      /** Si el perfil de usuario no existe, establecer loggedIn en false y profile en null */
      setLoggedIn(false);
      setProfile(null);
    }
  };

  /** Función de registro de usuario */
  const register = async () => {
    try {
      /** Enviar datos de registro a la ruta /register */
      await axios.post('/register', { username, email, password });

      /** Verificar estado de inicio de sesión */
      checkLoginStatus();

      /** Si el estado de inicio de sesión es exitoso, dar alerta de registro exitoso */
      alert('Registro exitoso');
    } catch (error) {
      /** Si el estado de inicio de sesión no es exitoso, dar alerta de error de registro */
      alert('Error al registrarse');
    }
  };

  /** Función de inicio de sesión */
  const login = async () => {
    try {
      /** Enviar datos de inicio de sesión a la ruta /login */
      await axios.post('/login', { username, password });

      /** Verificar estado de inicio de sesión */
      checkLoginStatus();

      /** Si el estado de inicio de sesión es exitoso, dar alerta de inicio de sesión exitoso */
      alert('Inicio de sesión exitoso');
    } catch (error) {
      /** Si el estado de inicio de sesión no es exitoso, dar alerta de error de inicio de sesión */
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  /** Función de obtención de perfil de usuario */
  const fetchProfile = async () => {
    try {
      /** Obtener perfil de usuario */
      const response = await axios.get<UserProfile>('/profile');

      /** Establecer profile en response.data */
      setProfile(response.data);
    } catch (error) {
      /** Si el perfil de usuario no existe, dar alerta de error de obtención de perfil */
      alert('Error al obtener el perfil');
    }
  };

  /** Función de cierre de sesión */
  const logout = async () => {
    try {
      /** Enviar solicitud de cierre de sesión a la ruta /logout */
      await axios.get('/logout');

      /** Establecer loggedIn en false y profile en null y dar alerta de cierre de sesión */
      setLoggedIn(false);
      setProfile(null);
      alert('Cierre de sesión exitoso');
    } catch (error) {
      /** Si el cierre de sesión no es exitoso, dar alerta de error de cierre de sesión */
      alert('Error al cerrar sesión');
    }
  };

  /** Retornar interfaz de usuario */
  return (
    <div>
      /** Si el usuario no está logueado, mostrar interfaz de registro e inicio de sesión */
      {!loggedIn ? (
        /** Interfaz de registro e inicio de sesión */
        <div>
          /** Interfaz de registro */
          <h2>Registro</h2>
          <input type="text" placeholder="Nombre de usuario" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={register}>Registrarse</button>

          /** Interfaz de inicio de sesión */
          <h2>Iniciar sesión</h2>
          <button onClick={login}>Iniciar sesión</button>
        </div>
      ) : (
        /** Si el usuario está logueado, mostrar interfaz de perfil */
        <div>
          <h2>Perfil</h2>
          /** Si el perfil de usuario existe, mostrar perfil de usuario */
          {profile ? (
            /** Interfaz de perfil de usuario */
            <div>
              <p>Nombre de usuario: {profile.username}</p>
              <p>Correo electrónico: {profile.email}</p>
              {/* <button onClick={fetchProfile}>Actualizar perfil</button> */}
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          ) : (
            <button onClick={fetchProfile}>Obtener perfil</button>
          )}
        </div>
      )}
    </div>
  );
}

/** Exportar aplicación */
export default App;

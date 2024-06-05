import {React, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash  } from "react-icons/fa";
import "./styles.css";
import api from '../../services/api';

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
  
    async function login(event){
      event.preventDefault();
  
      const data = {
        email, password
      };
  
      try {
        const response = await api.post('/api/Auth/Login', data);
        localStorage.setItem('email', email);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiration', response.data.expiration);
  
        navigate ("/HomePage");
  
      } catch (error) {
        alert('O login falhou' + error)
      }
    }
  
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const showPassword = () => {
      setPasswordVisible(!passwordVisible);
    };

    return(
<div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={login}>
          <section className="inputs-container">
            <input 
            type="email" 
            placeholder="exemplo@gmail.com" 
            value={email}
            onChange={e=>setEmail(e.target.value)} 
            required 
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="field-password"
                className="field-password"
                placeholder="***********"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
              />
            {passwordVisible ? (
                <FaEye id="faEye" size={20} onClick={showPassword} />
            ) : (
                <FaEyeSlash id="faEyeSlash" size={20} onClick={showPassword} />
            )}
            </div>
          </section>
          <section className="password-infos">
            <a href="#"> Esqueceu a senha?</a>
          </section>

          <button id="btn-login" type="submit">
            Login
          </button>
          <footer>
            <hr />
            <span>
              Ainda não tem uma conta? <a href={"/cadastro"}>Cadastre-se</a>
            </span>
          </footer>
        </form>
      </main>
    </div>
    );
}
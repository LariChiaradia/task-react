import React,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash  } from "react-icons/fa";
import "./styles.css";
import api from '../../services/api';

export default function Cadastro(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const showPassword = () => {
      setPasswordVisible(!passwordVisible);
    };

    const navigate = useNavigate();

    async function cadastrar(event){
        event.preventDefault();

        const data = {
            email, password, confirmPassword
        }
        
        try {
            const response = await api.post('/api/Auth/Register', data);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
      
            navigate ("/");
        } catch (error) {
            alert('O cadastro falhou' + error)
        }
    }

    return(
    <div>
        <header>
            <h1>Cadastro</h1>
        </header>
        <main>
        <form onSubmit={cadastrar}>
          <section className="inputs-container">
            <input 
            type="email" 
            placeholder="Informe o seu email" 
            value={email}
            onChange={e=>setEmail(e.target.value)} 
            required 
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="field-password"
                className="field-password"
                placeholder="Insira a sua senha"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
              />
            {passwordVisible ? (
                <FaEye id="faEye" size={20} color="#000000" onClick={showPassword} />
            ) : (
                <FaEyeSlash id="faEyeSlash" size={20} color="#000000" onClick={showPassword} />
            )}
            </div>
            <div className="password-container">
              <input
                type="password"
                id="passwordConfirm"
                className="passwordConfirm"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </section>
          <button id="btn-cadastrar" type="submit">
            Cadastrar
          </button>
        </form>
        </main>
    </div>
    );
}
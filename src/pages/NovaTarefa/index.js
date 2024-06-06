import {React, useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from "react-router-dom";
import './styles.css';
import api from '../../services/api';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';

export default function NovaTarefa(){

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [status, setStatus] = useState(null);
    const [dueDate, setDueDate] = useState('');

    const {Id} = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        if(Id === '0')
            return;
        else
        loadTarefas();
    }, [id]);

    async function loadTarefas(){
        try {
            const response = await api.get(`api/ActivityTask/${Id}`, authorization);

            const {id, title, description, priority, difficulty, status, dueDate} = response.data;
            setId(id);
            setTitle(title);
            setDescription(description);
            setPriority(priority);
            setDifficulty(difficulty);
            setStatus(status);
            setDueDate(dueDate);


        } catch (error) {
            alert("Erro ao recuperar o tarefa" + error);
            navigate("/tarefas");
        }
    }

    async function saveOrUpdate(event){
        event.preventDefault();

        const data = {id, title, description, priority, difficulty, status, dueDate}

        try {
            if(Id === "0"){
                await api.post("api/ActivityTask", data, authorization)
            }
            else{
                data.id = Id;
                await api.put(`api/ActivityTask/${Id}`, data, authorization)
            }
               
        } catch (error) {
            alert("Erro ao gravar tarefa" + error);
        }

        navigate("/tarefas")
    }

    return(
        <div className='novo-tarefas-container'>
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size="105" color="#1720a" />
                    <h1>{Id ==="0" ? "Cadastrar Nova Tarefa" : "Atualizar Tarefa"}</h1>
                    <Link className="back-link" to="/tarefas">
                        <FiCornerDownLeft size="25" color="#1720a" />
                        Retornar
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input 
                    placeholder='Titulo'
                    value={title}
                    onChange={e=> setTitle(e.target.value)}
                    />
                    <input 
                    placeholder='Descrição'
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                    />
                    <input 
                    placeholder='Prioridade'
                    value={priority}
                    onChange={e=> setPriority(e.target.value)}
                    />
                                        <input 
                    placeholder='Dificuldade'
                    value={difficulty}
                    onChange={e=> setDifficulty(e.target.value)}
                    />
                    <input 
                    placeholder='Status'
                    value={status}
                    onChange={e=> setStatus(e.target.value)}
                    />
                    <input 
                    placeholder='Vencimento'
                    value={dueDate}
                    onChange={e=> setDueDate(e.target.value)}
                    />
                    <button className='button' type='submit'>{Id ==="0" ? "Cadastrar" : "Atualizar"}</button>
                </form>
            </div>
        </div>
    );
}
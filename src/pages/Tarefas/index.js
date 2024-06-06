import React, {useState, useEffect}from 'react';
import { IoIosLogOut } from "react-icons/io";
import {Link, useNavigate, useParams} from "react-router-dom";
import { FiEdit, FiUserX} from "react-icons/fi";
import "./styles.css";
import api from '../../services/api';

export default function Tarefas(){

    const [title, setTitle] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchTarefas = (searchValue) =>{
        setSearchInput(searchValue);

        if(searchInput !== ''){
            const dadosFiltrados = tarefas.filter((item)=>{
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        }
        else{
            setFiltro(tarefas);
        }
    }

    useEffect(()=> {
        api.get("api/ActivityTask", authorization).then(
            response=>{setTarefas(response.data);      
            }, token)
    });

    async function logout(){
        try {
            localStorage.clear();
            localStorage.setItem("token", "");
            authorization.headers = "";
            navigate("/");
        } catch (error) {
            alert("Não foi possível fazer o logout" + error);
        }
    }

    async function editTask(id){
        try {
            navigate(`/tarefas/nova/${id}`)
        } catch (error) {
            alert("Não foi possível editar a Tarefa");
        }
    }

    async function deleteTask(id){
        try {
            if(window.confirm(`Deseja deletar a Tarefa ${id}  ?`))
            {
                await api.delete(`api/ActivityTask/${id}`, authorization);
                setTarefas(tarefas.filter(tarefa => tarefa.Id !== id));
            }
        } catch (error) {
            alert("Não foi possível excluir a tarefa" + error)
        }
    }


    return(
        <div className='tarefas-container'>
            <header className='header-tarefas'>
                <span className='bemVindo'>Bem Vindo(a), <strong>{email}</strong>!</span>
                <h1 className='title'>Suas Tarefas</h1>
                <button className="btn-logout" type='button' onClick={logout}>
                    <IoIosLogOut className="icon-logout" size={32} color="#ffffff"/>
                </button>
            </header>
            <main className='main-tarefas'>
                <div className='container-nova-tarefa'>
                    <Link className="btn-nova-tarefa" to={`/tarefas/nova/0`}>Criar Nova Tarefa</Link>
                    <form className='form-tarefas'>
                        <input 
                        type="text" 
                        placeholder="Nome" 
                        onChange={(e)=> searchTarefas(e.target.value)}
                        />
                    </form>
                </div>
                {searchInput.length >1 ? (
                <ul>
                    {filtro.map(({id, title, description, priority, difficulty, status, dueDate})=> (
                    <li key={id}>
                        <b>Titulo: </b>{title}<br/><br/>
                        <b>Descrição: </b>{description}<br/><br/>
                        <b>Prioridade: </b>{priority}<br/><br/>
                        <b>Dificuldade: </b>{difficulty}<br/><br/>
                        <b>Status: </b>{status}<br/><br/>
                        <b>Vencimento: </b>{dueDate}<br/><br/>

                        <button onClick={() => editTask(id)} type="button" >
                        <FiEdit size={25} color="#17202a"></FiEdit>
                        </button>
                        <button onClick={() => deleteTask(id)}type="button">
                        <FiUserX size={25} color="#17202a"></FiUserX>
                        </button>
                    </li>
                    ))}
                </ul>
                ) :(
                    <ul>
                    {tarefas.map(({id, title, description, priority, difficulty, status, dueDate})=> (
                    <li key={id}>
                        <b>Titulo: </b>{title}<br/><br/>
                        <b>Descrição: </b>{description}<br/><br/>
                        <b>Prioridade: </b>{priority}<br/><br/>
                        <b>Dificuldade: </b>{difficulty}<br/><br/>
                        <b>Status: </b>{status}<br/><br/>
                        <b>Vencimento: </b>{dueDate}<br/><br/>

                        <button onClick={() => editTask(id)} type="button" >
                        <FiEdit size={25} color="#17202a"></FiEdit>
                        </button>
                        <button onClick={() => deleteTask(id)}type="button">
                        <FiUserX size={25} color="#17202a"></FiUserX>
                        </button>
                    </li>
                    ))}
                </ul>
                )}
            </main>
        </div>
    );
}
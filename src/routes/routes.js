import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Tarefas from '../pages/Tarefas';
import NovaTarefa from '../pages/NovaTarefa';


export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<Cadastro/>} />
                <Route path="/tarefas" element={<Tarefas/>}/>
                <Route path="/tarefas/nova/:Id" element={<NovaTarefa/>} />
            </Routes>
        </BrowserRouter>
    )
}
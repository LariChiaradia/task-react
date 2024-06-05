import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";


export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<Cadastro/>} />
            </Routes>
        </BrowserRouter>
    )
}
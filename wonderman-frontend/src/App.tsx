import React from 'react';
import './App.css';
import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import NotFound from "./pages/problems/404/NotFound";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Navigate to={"/home"}/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>

                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

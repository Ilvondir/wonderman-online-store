import React from 'react';
import './App.css';
import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import NotFound from "./pages/problems/404/NotFound";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Category from "./pages/category/Category";
import Guard from "./components/Guard/Guard";
import Unauthorized from "./pages/problems/401/Unauthorized";
import CarouselPage from "./pages/carousel/CarouselPage";
import Admins from "./pages/admins/Admins";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Navigate to={"/home"}/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/category/:name"} element={<Category/>}/>

                    <Route path={"/profile"} element={
                        <Guard roles={["User", "Admin"]}>
                            <Profile/>
                        </Guard>
                    }/>

                    <Route path={"/carousel"} element={
                        <Guard roles={["Admin"]}>
                            <CarouselPage/>
                        </Guard>
                    }/>

                    <Route path={"/admins"} element={
                        <Guard roles={["Admin"]}>
                            <Admins/>
                        </Guard>
                    }/>

                    <Route path={"/401"} element={<Unauthorized/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

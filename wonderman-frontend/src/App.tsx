import React from 'react';
import './App.css';
import {Routes, BrowserRouter, Route, Navigate} from 'react-router-dom';
import NotFound from "./pages/problems/404/NotFound";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import CategoryPage from "./pages/products/category/CategoryPage";
import Guard from "./components/Guard/Guard";
import Unauthorized from "./pages/problems/401/Unauthorized";
import CarouselPage from "./pages/carousel/CarouselPage";
import Admins from "./pages/admins/Admins";
import ProductPage from "./pages/products/product/ProductPage";
import PurchasePage from "./pages/transactions/purchase/PurchasePage";
import AddProductsPage from "./pages/products/addProducts/AddProductsPage";
import AddedProducts from "./pages/products/addedProducts/AddedProducts";
import Transactions from "./pages/transactions/transactions/Transactions";
import TransactionPage from "./pages/transactions/transaction/TransactionPage";
import ProductEdit from "./pages/products/productEdit/ProductEdit";
import TransactionPay from "./pages/transactions/transactionPay/TransactionPay";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Navigate to={"/home"}/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/category/:name"} element={<CategoryPage/>}/>
                    <Route path={"/products/:id"} element={<ProductPage/>}/>

                    <Route path={"/profile"} element={
                        <Guard roles={["User", "Admin"]}>
                            <Profile/>
                        </Guard>
                    }/>

                    <Route path={"/transactions/:id"} element={
                        <Guard roles={["User", "Admin"]}>
                            <TransactionPage/>
                        </Guard>
                    }/>

                    <Route path={"/transactions/:id/pay"} element={
                        <Guard roles={["User", "Admin"]}>
                            <TransactionPay/>
                        </Guard>
                    }/>

                    <Route path={"/transactions"} element={
                        <Guard roles={["User", "Admin"]}>
                            <Transactions/>
                        </Guard>
                    }/>

                    <Route path={"/added/products"} element={
                        <Guard roles={["User", "Admin"]}>
                            <AddedProducts/>
                        </Guard>
                    }/>

                    <Route path={"add/products"} element={
                        <Guard roles={["User", "Admin"]}>
                            <AddProductsPage/>
                        </Guard>
                    }/>

                    <Route path={"/products/:id/purchase"} element={
                        <Guard roles={["User", "Admin"]}>
                            <PurchasePage/>
                        </Guard>
                    }/>

                    <Route path={"/products/:id/edit"} element={
                        <Guard roles={["User", "Admin"]}>
                            <ProductEdit/>
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

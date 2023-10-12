import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Wrapper = ({children}: any) => {
    return (
        <>
            <Header/>

            <main className="padding-1 col-12">
                {children}
            </main>

            <Footer/>
        </>
    );
};

export default Wrapper;
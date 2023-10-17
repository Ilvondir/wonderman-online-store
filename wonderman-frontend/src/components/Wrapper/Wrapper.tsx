import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CategoryMenu from "../CategoryMenu/CategoryMenu";

const Wrapper = ({children}: any) => {
    return (
        <>
            <Header/>

            <div className="main">

                <div className="main-left">
                    <CategoryMenu/>
                </div>

                <div className="main-right">
                    <main>
                        {children}
                    </main>
                </div>

            </div>

            <Footer/>
        </>
    );
};

export default Wrapper;
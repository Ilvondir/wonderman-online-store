import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";
import {headers, imgUrl} from "../../axios/commons";
import {Product} from "../../models/Product";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [wait, setWait] = useState(true);

    useEffect(() => {
        axios.get("products/bests", {headers: headers()})
            .then(response => {
                setProducts(response.data);
                setWait(false);
            })
    }, []);

    return (
        <Wrapper>
            <div className="home-page">
                <Carousel/>

                <h2>Our bestsellers</h2>

                <Spinner show={wait} customStyle={false}/>

                <div className="products">

                    {products?.map((product: Product, i: number) => {
                        i++;
                        return (
                            <>
                                <Link to={"/products/" + product.id}>
                                    <div className="product-card">

                                        <div className="img">
                                            <img src={imgUrl(product.photo)} alt="Photo."/>
                                        </div>


                                        <div className="info">
                                            <h2>{product.name}</h2>
                                            <div className="info-section">
                                                <strong>{Number(product.brutto).toFixed(2)} €</strong>
                                            </div>

                                            <div className="info-section">{product.description.slice(0, 100)}...</div>
                                        </div>

                                    </div>

                                </Link>

                                {i % 3 === 0 && <div className="row"/>}

                            </>
                        )
                    })}

                </div>

            </div>
        </Wrapper>
    );
};

export default Home;
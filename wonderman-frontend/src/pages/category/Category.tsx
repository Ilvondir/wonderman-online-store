import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {headers} from "../../axios/commons";
import {Product} from "../../models/Product";
import {useDispatch} from "react-redux";

const Category = () => {
    const {name} = useParams();
    const [wait, setWait] = useState(true);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("category/" + name, {headers: headers()})
            .then(response => {
                setProducts(response.data);
                setWait(false);
            })
    }, [name]);

    return (
        <Wrapper>
            <div className="category-page">

                <div className={wait ? "spinner-wrapper" : "spinner-wrapper hide"}>
                    <div className="spinner"></div>
                </div>

                <div className="products">

                    {products?.map((product: Product) => {
                        return (
                            <Link to={"/products/" + product.id}>
                                <div className="product-card">

                                    <div className="img">
                                        <img src={product.photo} alt="Photo."/>
                                    </div>


                                    <div className="info">
                                        <h2>{product.name}</h2>
                                        <div className="info-section"><strong>{product.netto} $</strong></div>
                                        <div className="info-section">{product.description.slice(0, 100)}...</div>
                                    </div>

                                </div>
                            </Link>
                        )
                    })}

                </div>

            </div>
        </Wrapper>
    );
};

export default Category;
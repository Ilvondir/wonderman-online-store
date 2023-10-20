import React, {useEffect, useState} from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import {Product} from "../../../models/Product";
import axios from "axios";
import {headers} from "../../../axios/commons";
import {useSelector} from "react-redux";

const ProductPage = () => {
    const {id} = useParams();
    const [wait, setWait] = useState(true);
    const user = useSelector((state: any) => state.user);
    const [product, setProduct] = useState(new Product());

    useEffect(() => {
        axios.get("/products/" + id, {headers: headers()})
            .then(response => {
                setWait(false);
                setProduct(response.data);
            })
    }, []);

    return (
        <Wrapper>
            <Spinner show={wait} customStyle={false}/>

            <div className={wait ? "product-page hide" : "product-page"}>

                <span>Category: {product.category.name}</span>
                <h2>{product.name}</h2>

                <div className="p-half">
                    <img src={product.photo} alt={product.name}/>
                </div>
                <div className="p-half">
                    Author: <strong>{product.author.first_name} {product.author.last_name}</strong><br/>
                    Added: <strong>{new Date(product.added).toLocaleDateString()}</strong><br/>
                    Contact: <strong>{product.author.email}</strong><br/>

                    <h2>{Number(product.brutto).toFixed(2)} $</h2>

                    {user && user.id !== product.author.id &&
                        <Link to={"/products/" + id + "/purchase"}>
                            <button>Go to purchase</button>
                        </Link>
                    }

                    {user && user.id === product.author.id &&
                        <>
                            <h2 style={{marginBottom: 0}}>This is your product.</h2>
                            <Link to={"/products/" + id + "/edit"}>
                                <button>Edit product</button>
                            </Link>
                        </>
                    }

                </div>

                <div className="description">
                    {product.description}
                </div>

            </div>
        </Wrapper>
    );
};

export default ProductPage;
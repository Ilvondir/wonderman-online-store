import React, {useEffect, useState} from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import Spinner from "../../../components/Spinner/Spinner";
import axios from "axios";
import {headers} from "../../../axios/commons";
import {Product} from "../../../models/Product";
import {Link} from "react-router-dom";

const AddedProducts = () => {
    const [wait, setWait] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("user/products", {headers: headers()})
            .then(response => {
                setProducts(response.data);
                setWait(false);
            })
    }, []);

    return (
        <Wrapper>
            <div className="added-products-page">
                <Spinner show={wait} customStyle={false}/>

                <div className={wait ? "hide" : "products"}>
                    <h2 style={{marginTop: "0"}}>Your products</h2>
                    <p>Products you sell.</p>

                    {products?.map((product: Product, i: number) => {
                        i++;
                        return (
                            <>
                                <Link to={"/products/" + product.id}>
                                    <div className="product-card">

                                        <div className="img">
                                            <img src={product.photo} alt={"Photo" + i + "."}/>
                                        </div>


                                        <div className="info">
                                            <h2>{product.name}</h2>
                                            <div className="info-section">
                                                <strong>{Number(product.brutto).toFixed(2)} $</strong>
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

export default AddedProducts;
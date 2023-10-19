import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {headers} from "../../axios/commons";
import {Product} from "../../models/Product";
import Spinner from "../../components/Spinner/Spinner";

const Category = () => {
    const {name} = useParams();
    const [wait, setWait] = useState(false);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setWait(true);
        axios.get("category/" + name, {headers: headers()})
            .then(response => {
                setProducts(response.data);
                setWait(false);
            })
    }, [name]);

    return (
        <Wrapper>
            <div className="category-page">

                <Spinner show={wait} customStyle={false}/>

                <div className={wait ? "products hide" : "products"}>

                    {products?.map((product: Product, i: number) => {
                        i++;
                        return (
                            <>
                                <Link to={"/products/" + product.id}>
                                    <div className="product-card">

                                        <div className="img">
                                            <img src={product.photo} alt="Photo."/>
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

export default Category;
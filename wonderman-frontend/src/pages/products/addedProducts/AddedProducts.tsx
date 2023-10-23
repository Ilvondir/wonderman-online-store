import React, {useEffect, useState} from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import Spinner from "../../../components/Spinner/Spinner";
import axios from "axios";
import {headers, imgUrl} from "../../../axios/commons";
import {Product} from "../../../models/Product";
import {Link} from "react-router-dom";

const AddedProducts = () => {
    const [wait, setWait] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        axios.get("user/products?page=" + page, {headers: headers()})
            .then(response => {
                setProducts(response.data.data);
                setMaxPage(response.data.meta.last_page);
                setWait(false);
            })
    }, [page]);

    const changePage = (change: number) => {
        if (change > 0) {
            if (page < maxPage) setPage(page + 1);
        } else if (page > 1) setPage(page - 1);
    }


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
                                            <img src={imgUrl(product.photo)} alt={"Photo" + i + "."}/>
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

                    <div className="paginator">
                        <ul>
                            <li onClick={() => changePage(-1)} className="without">Prev</li>
                            <li className="without">{page}</li>
                            <li onClick={() => changePage(1)}>Next</li>
                        </ul>
                    </div>

                </div>

            </div>

        </Wrapper>
    );
};

export default AddedProducts;
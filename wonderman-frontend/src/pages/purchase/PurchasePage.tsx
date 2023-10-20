import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Wrapper from "../../components/Wrapper/Wrapper";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import {headers} from "../../axios/commons";
import {Product} from "../../models/Product";

const PurchasePage = () => {
    const {id} = useParams();
    const [wait, setWait] = useState(true);
    const [product, setProduct] = useState(new Product());
    const [info, setInfo] = useState("");
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/products/" + id, {headers: headers()})
            .then(response => {
                setWait(false);
                setProduct(response.data);
            })
    }, []);

    const purchase = (e: SyntheticEvent, id: any) => {
        e.preventDefault();

        setClicked(true);

        axios.post("/products/" + product.id, {}, {headers: headers()})
            .then(response => {
                setClicked(false);
                navigate("/transactions/" + response.data.id);
            })
            .catch(error => {
                setClicked(false);
                setInfo(error.response.data.message);
            })

    }

    return (
        <Wrapper>

            <Spinner show={wait} customStyle={false}/>

            <div className={wait ? "purchase-page hide" : "purchase-page"}>
                <h2 style={{marginTop: 0}}>Purchase</h2>

                <p>Do you want purchase a product <strong>{product.name}</strong>?</p>

                <table className="text-align-center">
                    <thead>
                    <tr>
                        <th>Netto</th>
                        <th>Tax</th>
                        <th>Brutto</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{Number(product.netto).toFixed(2)} $</td>
                        <td>{product.tax}%</td>
                        <td><strong>{Number(product.brutto).toFixed(2)} $</strong></td>
                    </tr>
                    </tbody>
                </table>

                <Spinner show={clicked} customStyle={false}/>

                <div className={clicked ? "text-align-center hide" : "text-align-center"}>
                    <p>Before purchase check your transactions <Link to={"/transactions"}>here</Link>.</p>

                    <button onClick={(e) => purchase(e, product.id)}>Create transaction</button>

                    {info}

                    <Link to={"/products/" + id}>
                        <button>No, go back</button>
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
};

export default PurchasePage;
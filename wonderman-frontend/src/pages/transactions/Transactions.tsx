import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import {headers} from "../../axios/commons";
import {Transaction} from "../../models/Transaction";
import {Link, useNavigate} from "react-router-dom";

const Transactions = () => {
    const [wait, setWait] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("user/transactions", {headers: headers()})
            .then(response => {
                setWait(false);
                setTransactions(response.data);
            })
            .catch(error => navigate("/profile"));
    }, []);

    return (
        <Wrapper>
            <Spinner show={wait} customStyle={false}/>

            <div className={wait ? "hide" : "transactions"}>

                <h2 style={{marginTop: "0"}}>Your transactions</h2>
                <p>All your started transactions.</p>

                {transactions?.map((tr: Transaction) => {
                    return (
                        <Link to={"/transactions/" + tr.id}>
                            <div className={tr.payed ? "transaction  payed" : "transaction not-payed"}>
                                <div className="t-half">
                                    <h2>{tr.product.name}</h2>
                                    <p>Created: {new Date(tr.created).toLocaleDateString()}</p>
                                </div>
                                <div className="t-half">
                                    <h2>{Number(tr.price).toFixed(2)} $</h2>
                                </div>
                                <div className="t-half">
                                    {tr.payed ? (
                                        <>
                                            <h2>Completed</h2>
                                            <p>Payment date: {new Date(tr.payment_date).toLocaleDateString()}</p>
                                        </>
                                    ) : (
                                        <h2>Need action!</h2>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}

            </div>
        </Wrapper>
    );
};

export default Transactions;
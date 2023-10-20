import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Transaction} from "../../../models/Transaction";
import {headers} from "../../../axios/commons";
import Wrapper from "../../../components/Wrapper/Wrapper";
import Spinner from "../../../components/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {setTransaction} from "../../../store/actions/transaction";

const TransactionPage = () => {
    const {id} = useParams();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [wait, setWait] = useState(true);
    const [handleTransaction, setHandleTransaction] = useState(new Transaction());
    const [deleting, setDeleting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("/transactions/" + id, {headers: headers()})
            .then(response => {
                setHandleTransaction(response.data);
                setWait(false);
                if (response.data.user.id !== user.id) navigate("/401");
            })
            .catch(error => navigate("/profile"));
    }, []);

    const destroy = (id: any) => {
        setDeleting(true);

        axios.delete("transactions/" + handleTransaction.id, {headers: headers()})
            .then(response => {
                navigate("/transactions");
            })
            .catch(error => {
                setDeleting(false);
            })
    }

    const payment = () => {
        setSubmitted(true);

        axios.post("/transactions/" + handleTransaction.id + "/checkout", {
            "hostname": window.location.hostname
        }, {headers: headers()})
            .then(response => {
                dispatch(setTransaction(response.data.id));
                window.location = response.data.url;
            })
            .catch(error => {
                setSubmitted(false);
            });
    }


    return (
        <Wrapper>
            <Spinner show={wait} customStyle={false}/>

            <div className={wait ? "hide" : "transaction-page"}>
                <h2 style={{marginTop: 0}}>Transaction #{handleTransaction.id}</h2>
                <table>
                    <tbody>
                    <tr>
                        <th>Client</th>
                        <td>{handleTransaction.user.first_name} {handleTransaction.user.last_name}</td>
                        {!handleTransaction.payed &&
                            <td rowSpan={5}>

                                <Spinner show={deleting} customStyle={true}/>

                                <button className={deleting ? "hide" : ""}
                                        onClick={() => destroy(handleTransaction.id)}>Delete transaction
                                </button>
                            </td>
                        }
                    </tr>
                    <tr>
                        <th>Product</th>
                        <td><Link to={"/products/" + handleTransaction.product.id}>
                            {handleTransaction.product.name}
                        </Link></td>
                    </tr>
                    <tr>
                        <th>Transaction created</th>
                        <td>{new Date(handleTransaction.created).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{handleTransaction.payed ?
                            <span style={{color: "green"}}>Completed</span> :
                            <span style={{color: "red"}}>Not payed</span>}</td>
                    </tr>
                    <tr>
                        <th>Payment date</th>
                        <td>{handleTransaction.payed ? new Date(handleTransaction.payment_date).toLocaleDateString() : "-"}</td>
                    </tr>
                    </tbody>
                </table>

                <table className="text-align-center margin-top-2">
                    <caption><strong>Price</strong></caption>
                    <thead>
                    <tr>
                        <th>Netto</th>
                        <th>Tax</th>
                        <th>Brutto</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{Number(handleTransaction.product.netto).toFixed(2)} €</td>
                        <td>{handleTransaction.product.tax}%</td>
                        <td><strong>{Number(handleTransaction.product.brutto).toFixed(2)} €</strong></td>
                    </tr>
                    </tbody>
                </table>
                {!handleTransaction.payed &&
                    <>
                        <Spinner show={submitted} customStyle={false}/>
                        <button className={submitted ? "hide" : ""}
                                onClick={() => payment()}>Pay {handleTransaction.price} €
                        </button>
                    </>
                }
            </div>
        </Wrapper>
    );
};

export default TransactionPage;
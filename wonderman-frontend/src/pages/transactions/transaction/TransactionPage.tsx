import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Transaction} from "../../../models/Transaction";
import {headers} from "../../../axios/commons";
import Wrapper from "../../../components/Wrapper/Wrapper";
import Spinner from "../../../components/Spinner/Spinner";
import {useSelector} from "react-redux";
import transactions from "../transactions/Transactions";

const TransactionPage = () => {
    const {id} = useParams();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [wait, setWait] = useState(true);
    const [transaction, setTransaction] = useState(new Transaction());
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        axios.get("/transactions/" + id, {headers: headers()})
            .then(response => {
                setTransaction(response.data);
                setWait(false);
                if (response.data.user.id !== user.id) navigate("/401");
            })
            .catch(error => navigate("/profile"));
    }, []);

    const destroy = (id: any) => {
        setDeleting(true);

        axios.delete("transactions/" + transaction.id, {headers: headers()})
            .then(response => {
                navigate("/transactions");
            })
            .catch(error => {
                setDeleting(false);
            })
    }

    return (
        <Wrapper>
            <Spinner show={wait} customStyle={false}/>

            <div className={wait ? "hide" : "transaction-page"}>
                <h2 style={{marginTop: 0}}>Transaction #{transaction.id}</h2>
                <table>
                    <tbody>
                    <tr>
                        <th>Client</th>
                        <td>{transaction.user.first_name} {transaction.user.last_name}</td>
                        {!transaction.payed &&
                            <td rowSpan={5}>

                                <Spinner show={deleting} customStyle={true}/>

                                <button className={deleting ? "hide" : ""}
                                        onClick={() => destroy(transaction.id)}>Delete transaction
                                </button>
                            </td>
                        }
                    </tr>
                    <tr>
                        <th>Product</th>
                        <td><Link to={"/products/" + transaction.product.id}>
                            {transaction.product.name}
                        </Link></td>
                    </tr>
                    <tr>
                        <th>Transaction created</th>
                        <td>{new Date(transaction.created).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{transaction.payed ?
                            <span style={{color: "green"}}>Completed</span> :
                            <span style={{color: "red"}}>Not payed</span>}</td>
                    </tr>
                    <tr>
                        <th>Payment date</th>
                        <td>{transaction.payed ? new Date(transaction.payment_date).toLocaleDateString() : "-"}</td>
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
                        <td>{Number(transaction.product.netto).toFixed(2)} $</td>
                        <td>{transaction.product.tax}%</td>
                        <td><strong>{Number(transaction.product.brutto).toFixed(2)} $</strong></td>
                    </tr>
                    </tbody>
                </table>
                {!transaction.payed &&
                    <button>Pay {transaction.price} $</button>
                }

            </div>
        </Wrapper>
    );
};

export default TransactionPage;
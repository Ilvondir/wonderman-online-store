import React, {useEffect} from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import Spinner from "../../../components/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {headers} from "../../../axios/commons";
import {clearTransaction} from "../../../store/actions/transaction";

const TransactionPay = () => {
    const transaction_id = useSelector((state: any) => state.transaction);
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!transaction_id) navigate("/transactions/" + id);

        axios.put("/transactions/" + id + "/pay", {
            transaction_id
        }, {headers: headers()})
            .then(response => {
                dispatch(clearTransaction());
                navigate("/transactions/" + id)
            })
            .catch(error => {
                dispatch(clearTransaction());
                navigate("/transactions/" + id)
            })
    }, []);

    return (
        <Wrapper>
            <Spinner show={true} customStyle={false}/>
        </Wrapper>
    );
};

export default TransactionPay;
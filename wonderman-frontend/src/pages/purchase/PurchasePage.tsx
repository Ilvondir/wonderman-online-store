import React from 'react';
import {useParams} from "react-router-dom";
import Wrapper from "../../components/Wrapper/Wrapper";

const PurchasePage = () => {
    const {id} = useParams();

    return (
        <Wrapper>
            {id}
        </Wrapper>
    );
};

export default PurchasePage;
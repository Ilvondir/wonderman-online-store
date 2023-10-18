import React from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {useParams} from "react-router-dom";

const ProductPage = () => {
    const {id} = useParams();

    return (
        <Wrapper>
            Product {id}
        </Wrapper>
    );
};

export default ProductPage;
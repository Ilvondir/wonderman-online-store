import React from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {useParams} from "react-router-dom";

const Category = () => {
    const {name} = useParams();

    return (
        <Wrapper>
            Category {name}
        </Wrapper>
    );
};

export default Category;
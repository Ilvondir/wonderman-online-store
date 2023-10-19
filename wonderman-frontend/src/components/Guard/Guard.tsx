import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const Guard = (props: any) => {
    const roles = props.roles;
    const children = props.children;

    const user = useSelector((state: any) => state.user);

    if (!user) return (<Navigate to={"/login"}/>);

    if (roles?.indexOf(user?.role.name) === -1) return (<Navigate to={"/401"}/>);

    return children;
};

export default Guard;
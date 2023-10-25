import React from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Wrapper>
            <div className="error-page">
                <div className="communicate">
                    <h1>404</h1>
                    <p>Not found! We can't seem to find the page you are looking for.</p>

                    <Link to={"/home"} className="btn btn-link">
                        Back to Home
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
};

export default NotFound;
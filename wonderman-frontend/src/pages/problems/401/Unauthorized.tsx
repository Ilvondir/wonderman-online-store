import React from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import {Link} from "react-router-dom";

const Unauthorized = () => {
    return (
        <Wrapper>

            <div className="error-page">

                <div className="communicate">
                    <h1>401</h1>
                    <p>Unauthorized! Access to this resource is denied.</p>

                    <Link to={"/home"} className="btn btn-link">
                        Back to Home
                    </Link>
                </div>

            </div>

        </Wrapper>
    );
};

export default Unauthorized;
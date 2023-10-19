import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {headers} from "../../axios/commons";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../store/actions/user";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
    const [submitted, setSubmitted] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) navigate("/profile");
    }, []);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (login && password) {
            setSubmitted(true);

            axios.post("auth/login", {
                login,
                password
            }, {headers: headers()})
                .then(response => {
                    dispatch(setUser(response.data));
                    navigate("/profile");
                }).catch(error => {
                setError(error.response.data.error);
                setSubmitted(false);
            })
        }
    };

    return (
        <Wrapper>
            <div className="form-page">
                <div className="form">

                    <fieldset>
                        <legend><FontAwesomeIcon icon={faUserCircle}/></legend>

                        <Spinner show={submitted} customStyle={false}/>

                        <form onSubmit={(e) => submit(e)} className={submitted ? "hide" : ""}>

                            <div className="form-group">
                                <label htmlFor="login" className="label">Enter your login:</label><br/>
                                <input type="text" id="login" placeholder="Login"
                                       onChange={(e) => setLogin(e.target.value)} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="label">Enter your password:</label><br/>
                                <input type="password" id="password" placeholder="Password"
                                       onChange={(e) => setPassword(e.target.value)} required/>
                            </div>

                            <div className="form-group text-align-center">
                                <input type="submit" value="Login"/>
                            </div>

                            {error &&
                                <div className="form-group error">
                                    {error}
                                </div>
                            }

                        </form>

                    </fieldset>

                </div>
            </div>
        </Wrapper>
    );
};

export default Login;
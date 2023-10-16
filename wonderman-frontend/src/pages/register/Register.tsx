import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {headers} from "../../axios/commons";

const Register = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeated, setPasswordRepeated] = useState("");
    const [file, setFile] = useState(new FormData());

    const [submitted, setSubmitted] = useState(false);
    const user = useSelector((state: any) => state.user);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/profile");
    }, []);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (first_name && last_name && login && email && password && password_repeated) {

            axios.post("auth/register", {
                first_name,
                last_name,
                email,
                login,
                password,
                password_repeated,
                avatar: file
            }, {headers: headers()}).then(response => navigate("/login"));
        }
    }

    return (
        <Wrapper>
            <div className="form-page">
                <div className="form">

                    <fieldset>
                        <legend><FontAwesomeIcon icon={faUserPlus}/></legend>

                        <div className={submitted ? " spinner-wrapper" : " spinner-wrapper hide"}>
                            <div className="spinner"></div>
                        </div>


                        <form onSubmit={(e) => submit(e)} className={submitted ? "hide" : ""}>

                            <div className="form-group">
                                <label htmlFor="first_name" className="label">Enter your first name:</label><br/>
                                <input type="text" id="first_name" placeholder="First name"
                                       onChange={(e) => setFirstName(e.target.value)} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="last_name" className="label">Enter your last name:</label><br/>
                                <input type="text" id="last_name" placeholder="Last name"
                                       onChange={(e) => setLastName(e.target.value)} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="label">Enter your email:</label><br/>
                                <input type="email" id="email" placeholder="Email"
                                       onChange={(e) => setEmail(e.target.value)} required/>
                            </div>

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

                            <div className="form-group">
                                <label htmlFor="password_repeated" className="label">Repeat your password:</label><br/>
                                <input type="password" id="password_repeated" placeholder="Repeat password"
                                       onChange={(e) => setPasswordRepeated(e.target.value)} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="avatar" className="label">Select your avatar
                                    (optionally):</label><br/>
                                <input type="file" id="avatar" accept=".jpg,.png,.jpeg" onChange={(e) => {
                                    if (e.target.files == null) return;
                                    setFile(new FormData());
                                    file.append("avatar", e.target.files[0])
                                }
                                }/>
                            </div>

                            <div className="form-group text-align-center">
                                <input type="submit" value="Register"/>
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

export default Register;
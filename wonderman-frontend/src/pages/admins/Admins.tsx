import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {headers} from "../../axios/commons";
import {User} from "../../models/User";
import Spinner from "../../components/Spinner/Spinner";
import {useSelector} from "react-redux";

const Admins = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [wait, setWait] = useState(true);
    const loggedUser = useSelector((state: any) => state.user);

    const [admins, setAdmins] = useState([]);

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    useEffect(() => {
        axios.get("/auth/admins", {headers: headers()})
            .then(response => {
                setAdmins(response.data);
                setWait(false);
            })
    }, []);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (first_name && last_name && login && password && password_confirmation && email) {
            setSubmitted(true);

            axios.post("/auth/admins", {
                first_name,
                last_name,
                login,
                email,
                password,
                password_confirmation
            }, {headers: headers()})
                .then(response => {
                    setSubmitted(false);
                    setError("Admin created successfully.");
                    // @ts-ignore
                    setAdmins([...admins, response.data]);
                })
                .catch(error => {
                    setSubmitted(false);
                    setError(error.response.data.message);
                })
        }
    }

    const remove = (e: SyntheticEvent, id: any) => {
        e.preventDefault();

        setDeleting(true);

        axios.delete("users/" + id, {headers: headers()})
            .then(response => {
                setDeleting(false);
                setAdmins(admins.filter((user: User) => user.id !== id));
            })
            .catch(error => {
                setDeleting(false);
            })
    }

    return (
        <Wrapper>
            <div className="admins-page">
                <h2>Admins</h2>

                <div className="overflow-scroll">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Login</th>
                            <th>Email</th>
                            <th>Created</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {admins.map((user: User) => {
                            if (user.id !== loggedUser.id) return (
                                <tr key={user.id}>
                                    <td><strong>{user.id}</strong></td>
                                    <td className="text-align-center"><img src={user.avatar} alt="Avatar."
                                                                           className="smaller"/></td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.login}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created}</td>
                                    <td>

                                        <Spinner show={deleting} customStyle={true}/>

                                        <input type="button"
                                               onClick={(e) => remove(e, user.id)}
                                               value="Delete user"
                                               className={deleting ? "hide" : ""}/>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                <Spinner show={wait} customStyle={false}/>

                <h2>Add new admin</h2>
                <div className="form-page">

                    <div className="form">

                        <fieldset>
                            <legend><FontAwesomeIcon icon={faGear}/></legend>

                            <div className={submitted ? "spinner-wrapper" : "spinner-wrapper hide"}>
                                <div className="spinner"></div>
                            </div>


                            <form onSubmit={(e) => submit(e)} className={submitted ? "hide" : ""}>

                                <div className="form-group">
                                    <label htmlFor="first_name" className="label">Enter first name:</label><br/>
                                    <input type="text" id="first_name" placeholder="First name"
                                           onChange={(e) => setFirstName(e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="last_name" className="label">Enter last name:</label><br/>
                                    <input type="text" id="last_name" placeholder="Last name"
                                           onChange={(e) => setLastName(e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="label">Enter email:</label><br/>
                                    <input type="email" id="email" placeholder="Email"
                                           onChange={(e) => setEmail(e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="login" className="label">Enter login:</label><br/>
                                    <input type="text" id="login" placeholder="Login"
                                           onChange={(e) => setLogin(e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="label">Enter first password for
                                        admin:</label><br/>
                                    <input type="password" id="password" placeholder="Password"
                                           onChange={(e) => setPassword(e.target.value)} required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_repeated" className="label">Confirm password for
                                        admin:</label><br/>
                                    <input type="password" id="password_repeated" placeholder="Confirm password"
                                           onChange={(e) => setPasswordConfirmation(e.target.value)} required/>
                                </div>

                                <div className="form-group text-align-center">
                                    <input type="submit" value="Create admin"/>
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
            </div>
        </Wrapper>
    );
};

export default Admins;
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faSignOut, faSignIn} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {clearUser, setUser} from '../../store/actions/user';
import {headers} from "../../axios/commons";


const Header = () => {

    const [handleUser, setHandleUser] = useState(useSelector((state: any) => state.user));
    const dispatch = useDispatch();

    // useEffect(() => {
    //     axios.post("auth/login", {
    //         login: "user",
    //         password: "user"
    //     }, {}).then(response => {
    //         setHandleUser(response.data);
    //         dispatch(setUser(response.data));
    //     })
    // }, []);

    const logout = (e: SyntheticEvent) => {
        e.preventDefault();

        axios.delete("/auth/logout", {headers: headers()})
            .then(() => {
                setHandleUser(null);
                dispatch(clearUser())
            });
    }

    return (
        <header>
            <div className="header margin-bottom-2">
                <NavLink to={"/home"}>
                    <FontAwesomeIcon icon={faHome}/> Home
                </NavLink>

                {!handleUser &&
                    <>
                        <NavLink to={"/register"}>
                            <FontAwesomeIcon icon={faUser}/> Register
                        </NavLink>

                        <NavLink to={"/login"}>
                            <FontAwesomeIcon icon={faSignIn}/> Login
                        </NavLink>

                    </>
                }

                {handleUser &&
                    <>
                        <NavLink to={"/profile"}>

                            <div className="menu-profile-section">
                                <img src={handleUser.avatar} alt="Avatar."/>
                            </div>

                            <div className="menu-profile-section">
                                {handleUser.first_name} {handleUser.last_name}
                            </div>

                        </NavLink>

                        <a onClick={(e) => logout(e)}>
                            <FontAwesomeIcon icon={faSignOut}/> Logout
                        </a>
                    </>
                }

            </div>
        </header>
    );
};

export default Header;
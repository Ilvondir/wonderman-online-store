import React, {SyntheticEvent, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faSignOut, faSignIn} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {clearUser, setUser} from '../../store/actions/user';
import {headers} from "../../axios/commons";


const Header = () => {

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     axios.post("auth/login", {
    //         login: "admin",
    //         password: "admin"
    //     }, {}).then(response => {
    //         dispatch(clearUser());
    //         dispatch(setUser(response.data));
    //     })
    // }, []);

    const logout = (e: SyntheticEvent) => {
        e.preventDefault();

        axios.delete("/auth/logout", {headers: headers()})
            .then(() => dispatch(clearUser()));
    }

    return (
        <header>
            <div className="header margin-bottom-2">
                <NavLink to={"/home"}>
                    <FontAwesomeIcon icon={faHome}/> Home
                </NavLink>

                {!user &&
                    <>
                        <NavLink to={"/register"}>
                            <FontAwesomeIcon icon={faUser}/> Register
                        </NavLink>

                        <NavLink to={"/login"}>
                            <FontAwesomeIcon icon={faSignIn}/> Login
                        </NavLink>

                    </>
                }

                {user &&
                    <>
                        <NavLink to={"/profile"}>

                            <div className="menu-profile-section">
                                <img src={user.avatar} alt="Avatar."/>
                            </div>

                            <div className="menu-profile-section">
                                {user.first_name} {user.last_name}
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
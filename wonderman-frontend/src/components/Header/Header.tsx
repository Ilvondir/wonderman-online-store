import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faSignOut, faSignIn} from "@fortawesome/free-solid-svg-icons";


const Header = () => {

    const user = useSelector((state: any) => state.user);

    return (
        <header>
            <div className="header margin-bottom-2">
                <NavLink to={"/home"}>
                    <FontAwesomeIcon icon={faHome}/> Home
                </NavLink>

                {!user &&
                    <NavLink to={"/login"}>
                        <FontAwesomeIcon icon={faSignIn}/> Login
                    </NavLink>
                }

                {user &&
                    <>
                        <NavLink to={"/profile"}>
                            <FontAwesomeIcon icon={faUser}/> {user.first_name} {user.last_name}
                        </NavLink>
                        <NavLink to={"/logout"}>
                            <FontAwesomeIcon icon={faSignOut}/> Logout
                        </NavLink>
                    </>
                }


            </div>
        </header>
    );
};

export default Header;
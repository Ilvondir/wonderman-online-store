import React, {SyntheticEvent, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {headers} from "../../axios/commons";
import {clearUser, setUser} from "../../store/actions/user";
import Spinner from "../../components/Spinner/Spinner";

const Profile = () => {
    const user = useSelector((state: any) => state.user);

    const [first_name, setFirstName] = useState(user?.first_name);
    const [last_name, setLastName] = useState(user?.last_name);
    const [email, setEmail] = useState(user?.email);
    const [login, setLogin] = useState(user?.login);
    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [new_password_confirmation, setNewPasswordConfirmation] = useState("");

    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [passwordSubmitted, setPasswordSubmitted] = useState(false);
    const [avatarSubmitted, setAvatarSubmitted] = useState(false);

    const [dataError, setDataError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [avatarError, setAvatarError] = useState("");

    const formData = new FormData();

    const dispatch = useDispatch();

    const changeData = (e: SyntheticEvent) => {
        e.preventDefault();

        if (first_name && last_name && email && login) {
            setDataSubmitted(true);

            axios.put("/auth/profile", {
                first_name,
                last_name,
                email,
                login
            }, {headers: headers()})
                .then(response => {
                    setDataSubmitted(false);
                    const jwt = user?.jwt;
                    const res = response.data;
                    res["jwt"] = jwt;
                    dispatch(setUser(response.data));
                }).catch(error => {
                setDataSubmitted(false);
                setDataError(error.response.data.message)
            })
        }
    }

    const changePassword = (e: SyntheticEvent) => {
        e.preventDefault();

        if (old_password && new_password && new_password_confirmation) {
            setPasswordSubmitted(true);

            axios.put("auth/password", {
                new_password,
                old_password,
                new_password_confirmation
            }, {headers: headers()})
                .then(res => {
                    setPasswordSubmitted(false);
                    setPasswordError("Password changed successfully.")
                })
                .catch(error => {
                    setPasswordSubmitted(false);
                    setPasswordError(error.response.data.message);
                });
        }
    }

    const changeAvatar = (e: SyntheticEvent) => {
        e.preventDefault();

        setAvatarSubmitted(true);

        axios.post("auth/avatar/change", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + user?.jwt
                }
            })
            .then(response => {
                setAvatarSubmitted(false);
                const jwt = user?.jwt;
                const res = response.data;
                res["jwt"] = jwt;
                dispatch(setUser(response.data));
                setAvatarError("Avatar changed successfully.");
            })
            .catch(error => {
                setAvatarSubmitted(false);
                setAvatarError(error.response.data.message);
            })
    }

    const removeAvatar = (e: SyntheticEvent) => {
        e.preventDefault();

        setAvatarSubmitted(true);

        axios.put("auth/avatar/remove", {},
            {headers: headers()})
            .then(response => {
                setAvatarSubmitted(false);
                const jwt = user?.jwt;
                const res = response.data;
                res["jwt"] = jwt;
                dispatch(setUser(response.data));
                setAvatarError("Avatar removed successfully.");
            })
            .catch(error => {
                setAvatarSubmitted(false);
                setAvatarError(error.response.data.message);
            });
    }

    return (
        <Wrapper>
            <div className="profile-page">

                <div className="profile-section">
                    <div className="img-avatar">
                        <img src={user?.avatar} alt="Avatar."/>
                    </div>
                    <div className="img-title">
                        <h1>{user?.first_name} {user?.last_name}</h1>
                    </div>
                </div>

                <hr/>

                <div className="profile-section">
                    <h2>Change your data</h2>

                    <Spinner show={dataSubmitted} customStyle={false}/>

                    <form onSubmit={(e) => changeData(e)} className={dataSubmitted ? "hide" : ""}>

                        <div className="form-group">
                            <label htmlFor="first_name" className="label">Enter your new first name:</label><br/>
                            <input type="text" id="first_name"
                                   defaultValue={user?.first_name}
                                   placeholder="First name"
                                   onChange={(e) => setFirstName(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name" className="label">Enter your new last name:</label><br/>
                            <input type="text" id="last_name"
                                   defaultValue={user?.last_name}
                                   placeholder="Last name"
                                   onChange={(e) => setLastName(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login" className="label">Enter your new login:</label><br/>
                            <input type="text" id="login"
                                   defaultValue={user?.login}
                                   placeholder="Login"
                                   onChange={(e) => setLogin(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="label">Enter your new email:</label><br/>
                            <input type="email" id="email"
                                   defaultValue={user?.email}
                                   placeholder="Email"
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <div className="form-group text-align-center">
                            <input type="submit" value="Change data"/>
                        </div>

                        {dataError &&
                            <div className="form-group error">
                                {dataError}
                            </div>
                        }

                    </form>
                </div>

                <hr/>

                <div className="profile-section">
                    <h2>Change your password</h2>

                    <Spinner show={passwordSubmitted} customStyle={false}/>

                    <form onSubmit={(e) => changePassword(e)} className={passwordSubmitted ? "hide" : ""}>

                        <div className="form-group">
                            <label htmlFor="old_password" className="label">Enter your old password:</label><br/>
                            <input type="password" id="old_password"
                                   onChange={(e) => setOldPassword(e.target.value)} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password" className="label">Enter your new password:</label><br/>
                            <input type="password" id="new_password"
                                   onChange={(e) => setNewPassword(e.target.value)} required/>
                        </div>


                        <div className="form-group">
                            <label htmlFor="password_confirm" className="label">Confirm your new password:</label><br/>
                            <input type="password" id="password_confirm"
                                   onChange={(e) => setNewPasswordConfirmation(e.target.value)} required/>
                        </div>

                        <div className="form-group text-align-center">
                            <input type="submit" value="Change password"/>
                        </div>

                        {passwordError &&
                            <div className="form-group error">
                                {passwordError}
                            </div>
                        }

                    </form>
                </div>

                <hr/>

                <div className="profile-section">
                    <h2>Change your avatar</h2>

                    <Spinner show={avatarSubmitted} customStyle={false}/>

                    <form onSubmit={(e) => changeAvatar(e)} className={avatarSubmitted ? "hide" : ""}>

                        <div className="form-group">
                            <label htmlFor="avatar" className="label">Select your new avatar:</label><br/>
                            <input type="file"
                                   id="avatar"
                                   accept=".jpg,.png,.jpeg"
                                   onChange={(event) => {
                                       if (event.target.files == null) return;
                                       const file = event.target.files[0];
                                       formData.append("avatar", file);
                                   }
                                   }
                                   required/>
                        </div>


                        <div className="form-group text-align-center">
                            <input type="button" value="Remove avatar" onClick={(e) => removeAvatar(e)}/>
                            <input type="submit" value="Change avatar"/>
                        </div>

                        {avatarError &&
                            <div className="form-group error">
                                {avatarError}
                            </div>
                        }

                    </form>
                </div>

            </div>

        </Wrapper>
    );
};

export default Profile;
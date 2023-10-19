import React, {SyntheticEvent, useRef, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner/Spinner";
import {useSelector} from "react-redux";
import {Category} from "../../models/Category";
import axios from "axios";
import {headers} from "../../axios/commons";
import {useNavigate} from "react-router-dom";

const AddProductsPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const user = useSelector((state: any) => state.user);
    const categories = useSelector((state: any) => state.categories);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category_id, setCategoryId] = useState(0);
    const fileInput = useRef(null);

    let formData = new FormData();

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (name && price && description && category_id && formData.has("photo")) {
            setSubmitted(true);

            formData.append("name", name);
            formData.append("category_id", String(category_id));
            formData.append("price", String(price));
            formData.append("description", description);

            axios.post("/products", formData, {
                headers: {
                    "Authorization": "Bearer " + user.jwt,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                    setSubmitted(false);
                    navigate("/products/" + response.data.id);
                })
                .catch(error => {
                    setSubmitted(false);
                    setError(error.response.data.message);
                    // @ts-ignore
                    fileInput.current.value = null;
                    formData = new FormData();
                })
        }
    }


    return (
        <Wrapper>
            <div className="form-page">

                <div className="form">

                    <fieldset>
                        <legend><FontAwesomeIcon icon={faFolderPlus}/></legend>

                        <Spinner show={submitted} customStyle={false}/>

                        <form onSubmit={(e) => submit(e)} className={submitted ? "hide" : ""}>

                            <div className="form-group">
                                <label htmlFor="name" className="label">Enter name of product:</label><br/>
                                <input type="text"
                                       id="name"
                                       placeholder="Name"
                                       onChange={(e) => setName(e.target.value)}
                                       required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category" className="label">Select category:</label><br/>
                                <select
                                    id="category"
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                    required>
                                    <option value={0} selected></option>
                                    {categories.map((category: Category) => {
                                        return (
                                            <option value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price" className="label">Enter price:</label><br/>
                                <input type="number" id="price" placeholder="Price" min={0} step={0.01}
                                       onChange={(e) => setPrice(Number(e.target.value))} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description" className="label">Enter description:</label><br/>
                                <textarea id="description" placeholder="Description" rows={9}
                                          onChange={(e) => setDescription(e.target.value)} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="photo" className="label">Enter photo of product:</label><br/>
                                <input type="file" id="photo" ref={fileInput}
                                       onChange={(event) => {
                                           if (event.target.files == null) return;
                                           const file = event.target.files[0];
                                           formData.append("photo", file);
                                       }} required/>
                            </div>

                            <div className="form-group text-align-center">
                                <input type="submit" value="Create product"/>
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

export default AddProductsPage;
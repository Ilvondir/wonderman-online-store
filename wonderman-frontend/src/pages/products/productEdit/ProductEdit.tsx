import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import Spinner from "../../../components/Spinner/Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Category} from "../../../models/Category";
import {Product} from "../../../models/Product";
import {useNavigate, useParams} from "react-router-dom";
import {headers} from "../../../axios/commons";
import axios from "axios";
import {useSelector} from "react-redux";

const ProductEdit = () => {
    const [wait, setWait] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState(new Product());
    const [error, setError] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const categories = useSelector((state: any) => state.categories);
    const user = useSelector((state: any) => state.user);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const brutto = 1.18 * price;
    const [description, setDescription] = useState("");
    const [category_id, setCategoryId] = useState(0);

    useEffect(() => {
        axios.get("/products/" + id, {headers: headers()})
            .then(response => {
                setWait(false);
                setProduct(response.data);
                if (response.data.author.id !== user.id) navigate("/products/" + id);
                setName(response.data.name);
                setDescription(response.data.description);
                setCategoryId(response.data.category.id);
                setPrice(response.data.netto);
            })
            .catch(error => navigate("/products/" + id));
    }, []);

    const submit = (e: SyntheticEvent, id: any) => {
        e.preventDefault();

        if (category_id && name && price && description) {
            setSubmitted(true);

            axios.put("/products/" + id, {
                price,
                name,
                category_id,
                description
            }, {headers: headers()})
                .then(response => navigate("/products/" + id))
                .catch(error => {
                    setSubmitted(false);
                    setError(error.response.data.message);
                })
        }
    }

    return (
        <Wrapper>
            <Spinner show={wait} customStyle={false}/>

            <div className={wait ? "hide" : "form-page"}>

                <div className="form">

                    <fieldset>
                        <legend><FontAwesomeIcon icon={faEdit}/></legend>

                        <Spinner show={submitted} customStyle={false}/>

                        <form onSubmit={(e) => submit(e, product.id)} className={submitted ? "hide" : ""}>

                            <div className="form-group">
                                <label htmlFor="name" className="label">Enter name of product:</label><br/>
                                <input type="text"
                                       id="name"
                                       value={name}
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
                                    <option value={0}></option>
                                    {categories.map((category: Category) => {
                                        return (
                                            <option
                                                value={category.id}
                                                selected={category.id === category_id ? true : false}
                                            >{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="price" className="label">Enter price (you enter netto price, brutto with
                                    tax with be equal {Number(brutto).toFixed(2)}):</label><br/>
                                <input type="number" id="price" placeholder="Price" min={0} step={0.01}
                                       value={price}
                                       onChange={(e) => setPrice(Number(e.target.value))} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description" className="label">Enter description:</label><br/>
                                <textarea id="description" placeholder="Description" rows={9} value={description}
                                          onChange={(e) => setDescription(e.target.value)} required/>
                            </div>

                            <div className="form-group text-align-center">
                                <input type="submit" value="Update product"/>
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

export default ProductEdit;
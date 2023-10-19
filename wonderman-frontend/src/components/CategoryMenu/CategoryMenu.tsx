import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltDown} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Category} from "../../models/Category";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCategories} from "../../store/actions/categories";
import {setMenuState} from "../../store/actions/menuState";

const hide = {
    maxHeight: 0,
    transition: '800ms'
};

const show = {
    maxHeight: '1000px',
    transition: '800ms'
};

const CategoryMenu = () => {
    const menuState = useSelector((state: any) => state.menuState);
    const [categoryOpen, setCategoryOpen] = useState(menuState ? menuState : false);
    const [handleCategories, setHandleCategories] = useState(useSelector((state: any) => state.categories));
    const dispatch = useDispatch();


    useEffect(() => {
        if (!handleCategories) {
            axios.get("categories")
                .then(response => {
                    setHandleCategories(response.data);
                    dispatch(setCategories(response.data));
                });
        }
    }, []);

    return (
        <nav>
            <div className="category-button" onClick={() => {
                setCategoryOpen(!categoryOpen);
                dispatch(setMenuState(!categoryOpen));
            }}>
                <FontAwesomeIcon icon={faLongArrowAltDown}/> Categories
            </div>

            <div className="categories" style={categoryOpen ? show : hide}>
                <ul>
                    {handleCategories?.map((category: Category) => {
                        return (
                            <NavLink to={"/category/" + category.name}>
                                <li key={category.id}>{category.name}</li>
                            </NavLink>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default CategoryMenu;
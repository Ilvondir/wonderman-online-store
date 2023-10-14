import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltDown} from "@fortawesome/free-solid-svg-icons";

const hide = {
    maxHeight: 0,
    transition: '500ms'
};

const show = {
    maxHeight: '500px',
    transition: '500ms'
};

const CategoryMenu = () => {
    const [categoryOpen, setCategoryOpen] = useState(false);

    return (
        <nav>
            <div className="category-button" onClick={() => setCategoryOpen(!categoryOpen)}>
                <FontAwesomeIcon icon={faLongArrowAltDown}/> Categories
            </div>

            <div className="categories" style={categoryOpen ? show : hide}>
                <ul>
                    <li>IT</li>
                    <li>Economy</li>
                    <li>Finances</li>
                    <li>PKB</li>
                    <li>Fajnie</li>
                    <li>Bardzo ładnie</li>
                </ul>
            </div>
        </nav>
    );
};

export default CategoryMenu;
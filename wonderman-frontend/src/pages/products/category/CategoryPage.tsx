import React, {useEffect, useState} from 'react';
import Wrapper from "../../../components/Wrapper/Wrapper";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {headers, imgUrl} from "../../../axios/commons";
import {Product} from "../../../models/Product";
import Spinner from "../../../components/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {Category} from "../../../models/Category";
import {setCurrentCategory} from "../../../store/actions/currentCategory";

const CategoryPage = () => {
    const {name} = useParams();
    const oldCategory = useSelector((state: any) => state.currentCategory);
    const dispatch = useDispatch();
    const [wait, setWait] = useState(false);
    const [category, setCategory] = useState(new Category());
    const cats = useSelector((state: any) => state.categories);
    const [products, setProducts] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);


    useEffect(() => {
        if (oldCategory !== name) {
            setCategory(cats.filter((c: Category) => c.name === name)[0]);
            dispatch(setCurrentCategory(category.name));
            if (page !== 1) {
                setPage(1);
                return;
            }
        }

        setWait(true);
        axios.get("category/" + name + "?page=" + page, {headers: headers()})
            .then(response => {


                setProducts(response.data.data);
                setMaxPage(response.data.meta.last_page);
                setWait(false);
            })
    }, [name, page]);

    const changePage = (change: number) => {
        if (change > 0) {
            if (page < maxPage) setPage(page + 1);
        } else if (page > 1) setPage(page - 1);
    }

    return (
        <Wrapper>
            <div className="category-page">

                <Spinner show={wait} customStyle={false}/>

                <div className={wait ? "products hide" : "products"}>

                    <h2 style={{marginTop: "0"}}>{category?.name}</h2>
                    <p>{category?.description}</p>

                    {products?.map((product: Product, i: number) => {
                        i++;
                        return (
                            <>
                                <Link to={"/products/" + product.id}>
                                    <div className="product-card">

                                        <div className="img">
                                            <img src={imgUrl(product.photo)} alt={"Photo" + i + "."}/>
                                        </div>


                                        <div className="info">
                                            <h2>{product.name}</h2>
                                            <div className="info-section">
                                                <strong>{Number(product.brutto).toFixed(2)} €</strong>
                                            </div>

                                            <div className="info-section">{product.description.slice(0, 100)}...</div>
                                        </div>

                                    </div>

                                </Link>

                                {i % 3 === 0 && <div className="row"/>}

                            </>
                        )
                    })}

                    <div className="paginator">
                        <ul>
                            <li onClick={() => changePage(-1)} className="without">Prev</li>
                            <li className="without">{page}</li>
                            <li onClick={() => changePage(1)}>Next</li>
                        </ul>
                    </div>

                </div>

            </div>
        </Wrapper>
    );
};

export default CategoryPage;
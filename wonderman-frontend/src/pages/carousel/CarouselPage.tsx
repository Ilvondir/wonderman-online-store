import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import Wrapper from "../../components/Wrapper/Wrapper";
import Carousel from "../../components/Carousel/Carousel";
import {Slide} from "../../models/Slide";
import axios from "axios";
import {headers} from "../../axios/commons";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const spinner = {
    marginBottom: "auto",
    marginTop: "auto"
}

const CarouselPage = () => {
    const carouselRef = useRef();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [slides, setSlides] = useState([]);
    const [deleting, setDeleting] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const formData = new FormData();

    useEffect(() => {
        setTimeout(() => {
            // @ts-ignore
            setSlides(carouselRef.current?.sendSlides());
        }, 2000);
    }, []);

    const removeSlide = (e: SyntheticEvent, id: any) => {
        e.preventDefault();

        setDeleting(true);

        axios.delete("/slides/" + id, {headers: headers()})
            .then(res => {
                setSlides(slides.filter((s: Slide) => s.id !== id));
                setDeleting(false);
            })
    }

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (title && description) {
            setSubmitted(true)

            formData.append("title", title);
            formData.append("description", description);

            axios.post("/slides", formData, {
                headers: {
                    "Authorization": "Bearer " + user?.jwt,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                    setSubmitted(false);
                    setError("Slide created successfully.");
                    // @ts-ignore
                    setSlides([...slides, response.data]);
                })
        }
    }

    return (
        <Wrapper>
            <div className="carousel-page">
                <Carousel ref={carouselRef}/>

                <div className="carousel-section">
                    <h2>Manage carousel</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {slides?.map((slide: Slide) => {
                            return (
                                <tr key={slide.id}>
                                    <td><strong>{slide.id}</strong></td>
                                    <td><img src={slide.image} alt="Slide."/></td>
                                    <td>{slide.title}</td>
                                    <td>{slide.description}</td>
                                    <td>
                                        <div className={deleting ? "spinner-wrapper" : "spinner-wrapper hide"}
                                             style={spinner}>
                                            <div className="spinner"></div>
                                        </div>

                                        <input type="button"
                                               onClick={(e) => removeSlide(e, slide.id)}
                                               value="Delete slide"
                                               className={deleting ? "hide" : ""}/>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    <h2>Add slide</h2>

                    <form onSubmit={(e) => submit(e)}>

                        <div className="form-group">
                            <label htmlFor="title">Enter title:</label><br/>
                            <input type="text" placeholder="Title"
                                   onChange={(e) => setTitle(e.target.value)}
                                   id="title" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Enter description:</label><br/>
                            <textarea placeholder="Description"
                                      onChange={(e) => setDescription(e.target.value)}
                                      rows={5}
                                      id="description" required></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="file">Enter image (ratio must be 2:1):</label><br/>
                            <input type="file"
                                   id="file"
                                   required
                                   onChange={(e) => {
                                       if (e.target.files == null) return;
                                       const file = e.target.files[0];
                                       formData.append("image", file);
                                   }}
                            />
                        </div>

                        <div className="form-group text-align-center">
                            <input type="submit" value="Add"/>
                        </div>

                        {error &&
                            <div className="form-group error">
                                {error}
                            </div>
                        }

                    </form>

                </div>

            </div>
        </Wrapper>
    );
};

export default CarouselPage;
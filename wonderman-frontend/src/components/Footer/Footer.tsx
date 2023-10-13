import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <footer>
            <div className="footer margin-top-2 padding-3">

                <div className="footer-section">
                    <div className="footer-container margin-bottom-3">
                        <div className="half"><FontAwesomeIcon icon={faPhone}/></div>
                        <div className="half"><a href="tel:+48539023985">+48 539 023 985</a></div>
                    </div>

                    <div className="footer-container margin-bottom-3">
                        <div className="half"><FontAwesomeIcon icon={faEnvelope}/></div>
                        <div className="half"><a href="mailto:contact@wonderman.com">contact@wonderman.com</a></div>
                    </div>

                    <div className="footer-container">
                        <div className="half"><FontAwesomeIcon icon={faMap}/></div>
                        <div className="half">55 Shopping Street, <strong>London</strong></div>
                    </div>
                </div>


                <div className="footer-section">
                    <h1 className="margin-top-0">
                        Wonderman Store
                    </h1>
                    <p className="margin-bottom-0">
                        Our online store offers a wide range of products to cater to every need and preference.
                        Discover a diverse selection of high-quality items, from the latest fashion trends to
                        cutting-edge electronics. Browse through our user-friendly interface, explore various
                        categories, and find the perfect products at competitive prices. Enjoy a seamless shopping
                        experience with secure payments.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
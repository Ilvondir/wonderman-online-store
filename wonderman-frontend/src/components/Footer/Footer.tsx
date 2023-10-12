import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
    return (
        <footer>
            <div className="footer col-12 padding-3 margin-top-2">
                <div className="row">
                    <div className="col-6">
                        <div className="col-3 text-align-right">
                            <div className="font-size-2 margin-bottom-2 margin-right-1"><FontAwesomeIcon icon={faMap}/>
                            </div>
                            <div className="font-size-2 margin-bottom-2 margin-right-1"><FontAwesomeIcon
                                icon={faPhone}/>
                            </div>
                            <div className="font-size-2 margin-right-1"><FontAwesomeIcon icon={faEnvelope}/>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="font-size-2 margin-bottom-2"><a href="tel:+48539023985">+48 539 023 985</a>
                            </div>
                            <div className="font-size-2 margin-bottom-2"><a
                                href="mailto:contact@wonderman.com">contact@wonderman.com</a></div>
                            <div className="font-size-2">55 Shopping Street, <strong>London</strong></div>
                        </div>
                    </div>
                    <div
                        className="col-6 text-align-right padding-bottom-1 padding-left-1 padding-right-1  font-size-1">
                        <h1 className="margin-top-0">Wonderman Store</h1>
                        <p>
                            Our online store offers a wide range of products to cater to every need and preference.
                            Discover
                            a diverse selection of high-quality items, from the latest fashion trends to cutting-edge
                            electronics. Browse through our user-friendly interface, explore various categories, and
                            find
                            the perfect products at competitive prices. Enjoy a seamless shopping experience with secure
                            payments.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
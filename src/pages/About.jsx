import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Aboutus } from "../components/svg/aboutus.svg";

function About() {
    return (
        <>
            <div className="about">
                <div className="container">
                    <div className="about__content">
                        <h2 className="heading heading-secondary">About Us</h2>
                        <p className="about__text">
                            We are here to help you choose the score or score
                            you want. Providing all facilities for you and
                            paying the price of the vehicle you want in
                            installments for up to five years. We help you to
                            choose the appropriate vehicle for the nature of
                            your life and the amount you want to pay.
                        </p>

                        <button className="btn btn-contact">
                            <Link className="about__link" to="/contact">
                                Contact us
                            </Link>
                        </button>
                        <p className="about__text">
                            We hope that you will see the range of vehicles we
                            have, and you can also order other vehicles. Just
                            contact us, we are here to help you, not for
                            anything else. Have fun
                        </p>
                        <button className="btn btn-car">
                            <Link className="about__link" to="/cars">
                                Cars section &rarr;
                            </Link>
                        </button>
                    </div>
                    <div className="about__img">
                        <Aboutus />
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;

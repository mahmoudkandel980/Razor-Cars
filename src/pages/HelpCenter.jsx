import React from "react";

import ContactForm from "../components/ContactForm";

import { BsFillTelephoneFill } from "react-icons/bs";

import { ReactComponent as HelpCenterSvg } from "../components/svg/helpCenter.svg";

function HelpCenter() {
    return (
        <div className="contactUs">
            <div className="container">
                <div className="contactUs__content">
                    <h1 className="heading heading-secondary">HelpCenter</h1>
                    <div className="text contactUs__text ">
                        <span>
                            We hope you will not complain about anything. But we
                            are here for your convenience. Do not hesitate to
                            submit a complaint about anything you did not like.
                        </span>
                        <div>
                            <span>If you are in a hurry, please call us</span>
                            <a href="tel:+201122442622">
                                <BsFillTelephoneFill className="contactUs__icon" />
                            </a>
                        </div>
                    </div>
                    <ContactForm />
                </div>
                <div className="contactUs__img">
                    <HelpCenterSvg />
                </div>
            </div>
        </div>
    );
}

export default HelpCenter;

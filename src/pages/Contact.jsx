import React from "react";

import ContactForm from "../components/ContactForm";
import { BsFillTelephoneFill } from "react-icons/bs";

import { ReactComponent as Contactus } from "../components/svg/contactus.svg";

function Contact() {
    return (
        <div className="contactUs">
            <div className="container">
                <div className="contactUs__content">
                    <h1 className="heading heading-secondary">Contact us</h1>
                    <div className="text contactUs__text ">
                        <span>
                            You can send an email and we will reply to you
                            within 24 hours.
                        </span>
                        <br />
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
                    <Contactus />
                </div>
            </div>
        </div>
    );
}

export default Contact;

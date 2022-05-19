import React from "react";
import { Link } from "react-router-dom";

import { getAuth } from "firebase/auth";

import logo from "../../assets/logo.png";

import { BsFacebook } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io";

import { AiFillTwitterCircle } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";

import { ImLocation } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMailSharp } from "react-icons/io5";

function Footer() {
    const user = getAuth().currentUser;

    return (
        <div className="footer">
            <div className="container">
                <div className="log-col">
                    <div className="logo">
                        <Link to="/home" className="footer__logo">
                            <img src={logo} alt="logo" className="logo-img" />
                        </Link>
                    </div>

                    <div className="footer__social">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://web.facebook.com/profile.php?id=100008326722554"
                        >
                            <BsFacebook className="icon facebook-icon" />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/mahmud_kandel/"
                        >
                            <IoLogoInstagram className="icon instagram-icon" />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://twitter.com/MahmoudKandel98"
                        >
                            <AiFillTwitterCircle className=" icon twitter-icon" />
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://wa.me/+201122442622"
                        >
                            <BsWhatsapp className=" icon whatsapp-icon" />
                        </a>
                    </div>
                    <p className="footer__text">
                        copyright &copy; 2022 by Mahmoud Kandel. Please do not
                        attribute this work to yourself or an any organization.
                    </p>
                </div>
                <div className="contact-col">
                    <h2 className="heading heading-tertiary footer-header">
                        Contact Us
                    </h2>
                    <div className="contact">
                        <ul className="contact-nav">
                            <li className="contact-item">
                                <a
                                    className="contact-link"
                                    href="https://www.google.com/maps/search/21+Talaat+Harb+Street.,+Branched+from+Abbas+++++++++++++++++++++++++++++++++++++Kamel,+Cairo/@30.0486149,31.2416249,17z/data=!3m1!4b1"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <ImLocation className="icon location-icon" />
                                    <span>
                                        21 Talaat Harb Street., Branched from
                                        Abbas Kamel, Cairo
                                    </span>
                                </a>
                            </li>
                            <li className="contact-item">
                                <a
                                    className="contact-link"
                                    href="tel:+201122442622"
                                >
                                    <BsFillTelephoneFill className="icon telephone-icon" />
                                    <span>+201122442622</span>
                                </a>
                            </li>
                            <li className="contact-item">
                                <a
                                    className="contact-link"
                                    href="mailto:www.mahmoudkandel980@gmail.com"
                                >
                                    <IoMailSharp className="icon mail-icon" />
                                    <span>mahmoudkandel980</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="account-col">
                    <h2 className="heading heading-tertiary footer-header">
                        Account
                    </h2>
                    <div className="account">
                        <ul className="footer-nav">
                            <li className="footer-item">
                                <Link
                                    className="footer-link"
                                    to={user ? "/profile" : "/Signin"}
                                >
                                    Sign in
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link
                                    className="footer-link"
                                    to={user ? "/profile" : "/Signin"}
                                >
                                    Create Account
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link
                                    className="footer-link"
                                    to={user ? "/logout" : "/Signin"}
                                >
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="company-col">
                    <h2 className="heading heading-tertiary footer-header">
                        Company
                    </h2>
                    <div className="company">
                        <ul className="footer-nav">
                            <li className="footer-item">
                                <Link className="footer-link" to="/about">
                                    About us
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link className="footer-link" to="/jobs">
                                    Jobs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="resources-col">
                    <h2 className="heading heading-tertiary footer-header">
                        Resources
                    </h2>
                    <div className="resources">
                        <ul className="footer-nav">
                            <li className="footer-item">
                                <Link
                                    className="footer-link"
                                    to="/contact/helpCenter"
                                >
                                    Help center
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link
                                    className="footer-link"
                                    to="/contact/Privacy"
                                >
                                    Privacy & terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

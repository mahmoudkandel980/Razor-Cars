import React, { useState, useEffect } from "react";

import Button from "./Button";

import { HiChevronDoubleUp } from "react-icons/hi";

function SlideUp() {
    const [showSlideupButton, setShowSlideupButton] = useState(false);

    useEffect(() => {
        window.onscroll = function () {
            if (window.pageYOffset >= window.innerHeight / 2) {
                setShowSlideupButton(true);
            } else {
                setShowSlideupButton(false);
            }
        };
    }, []);

    const slideupHandler = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className={`slideup ${showSlideupButton && "show-slide-up"}`}>
            {showSlideupButton && (
                <Button className="btn slideup-btn" onClick={slideupHandler}>
                    <HiChevronDoubleUp className=" slideup-icon" />
                </Button>
            )}
        </div>
    );
}

export default SlideUp;

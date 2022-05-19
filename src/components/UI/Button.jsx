import React from "react";

function Button(props) {
    return (
        <div className="form__btn">
            <button
                className={`btn ${props.className}`}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </div>
    );
}

export default Button;

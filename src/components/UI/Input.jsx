import React from "react";

function Input(props) {
    const {
        htmlFor,
        label,
        type,
        id,
        placeholder,
        value,
        onChange,
        children,
        minLength,
        min,
        max,
        step,
        readOnly,
        multiple,
    } = props;

    return (
        <div className="form-group">
            <label htmlFor={htmlFor}>{label}</label>
            <div className="input-group">
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    required
                    value={value}
                    onChange={onChange}
                    minLength={minLength}
                    min={min}
                    max={max}
                    step={step}
                    readOnly={readOnly}
                    multiple={multiple}
                />
                <div className="input-group__icon">{children}</div>
            </div>
        </div>
    );
}

export default Input;

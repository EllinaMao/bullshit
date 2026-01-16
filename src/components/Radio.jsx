import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Radio = React.memo(({ options, currentValue, onChange }) => {
    // console.log("Rendering Radio 🚨");
    return (
        <div className="container">
            {options.map((option) => (
                <label key={option.value} className="form-check form-check-inline me-3">
                    <input
                        type="radio"
                        value={option.value}
                        checked={currentValue === option.value}
                        onChange={() => onChange(option.value)}
                        className="form-check-input"
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
});
export default Radio;
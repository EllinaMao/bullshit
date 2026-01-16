import React from "react";
const Radio = React.memo(({ options, currentValue, onChange }) => {
    // console.log("Rendering Radio 🚨");
    return (
        <div>
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={currentValue === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
});
export default Radio;
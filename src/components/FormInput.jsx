import React from "react";

const FormInput = React.memo(({ value, onChange, ...props }) => {
    // console.log("Rendering FormInput 🚇");
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
        />
    );
}
);
export default FormInput;
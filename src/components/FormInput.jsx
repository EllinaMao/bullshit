import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FormInput = React.memo(({ value, onChange, ...props }) => {
    // console.log("Rendering FormInput 🚇");
    return (
        <input className="form-control mb-3 mt-2 mb-2"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
        />
    );
}
);
export default FormInput;
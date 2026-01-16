import React from "react";

const FormInput = React.memo(({ value, onChange, ...props }) => {
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
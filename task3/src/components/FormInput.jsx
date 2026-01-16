import React from "react";

const FormInput = React.memo(({ label, value, onChange, ...props }) => {
  return (
    <label className="form-label">
      {label}
      <input
        className="form-control mb-3 mt-2 mb-2"
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
});
export default FormInput;

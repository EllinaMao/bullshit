const FormInput = ({ value, onChange, ...props}) => {
    return (
        <input
            value={value}
            onChange={onChange}
            {...props}
        />
    );
}
export default FormInput;
import React from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const Radio = React.memo(({ options, currentValue, onChange }) => {
    return (
        <div className="mb-3 d-flex justify-content-center">
            <ToggleButtonGroup 
                type="radio" 
                name="search-mode" 
                value={currentValue} 
                onChange={onChange}
            >
                {options.map((option, idx) => (
                    <ToggleButton
                        key={option.value}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="radio"
                        value={option.value}
                        checked={currentValue === option.value}
                    >
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
});

export default Radio;
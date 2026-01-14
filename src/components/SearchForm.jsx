import React from 'react';
import FormInput from "./FormInput";
import Radio from "./Radio";

const SEARCH_OPTIONS = [
    { label: 'By City', value: 'city' },
    { label: 'By Coordinates', value: 'coordinates' },
];
const SearchForm = React.memo(({
    mode,
    setMode,
    city,
    setCity,
    coordinates,
    coordinateHandlers,
    onSearch,
    loading
}) => {
    console.error("Rendering SearchForm component");

    return (
        <div>
            <Radio options={SEARCH_OPTIONS} currentValue={mode} onChange={setMode}></Radio>
            {mode === 'city' ? (
                <FormInput
                    type="text"
                    value={city}
                    onChange={setCity}
                    placeholder="Enter city name"
                    required
                />
            ) : (
                <>
                    <FormInput
                        type="number"
                        value={coordinates.latitude}
                        onChange={coordinateHandlers.latitude}
                        placeholder="Enter latitude"
                        required
                    />
                    <FormInput
                        type="number"
                        value={coordinates.longitude}
                        onChange={coordinateHandlers.longitude}
                        placeholder="Enter longitude"
                        required
                    />
                </>
            )}
            <button onClick={onSearch} disabled={loading}>
                {'Search'}
            </button>
            <p>{loading ? 'Loading...' : ''}</p>
            {/**ill make later anounser from portals */}
        </div>

    );
});

export default SearchForm;
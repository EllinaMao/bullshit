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
    onSearch,
    loading
}) => {
    // console.log("Rendering SearchForm component");
    const [city, setCity] = React.useState('');
    const [coordinates, setCoordinates] = React.useState({ latitude: '', longitude: '' });
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
                        onChange={setCoordinates}
                        placeholder="Enter latitude"
                        required
                    />
                    <FormInput
                        type="number"
                        value={coordinates.longitude}
                        onChange={setCoordinates}
                        placeholder="Enter longitude"
                        required
                    />
                </>
            )}
            <button onClick={() => mode === 'city' ? onSearch(city) : onSearch(coordinates)} disabled={loading}>
                Search
            </button>
            <p>{loading ? 'Loading...' : ''}</p>
        </div>

    );
});

export default SearchForm;
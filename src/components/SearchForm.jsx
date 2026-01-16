import FormInput from "./FormInput";
import Radio from "./Radio";
import { useCity } from "../hooks/useCity";
import { memo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SEARCH_OPTIONS = [
    { label: 'By City', value: 'city' },
    { label: 'By Coordinates', value: 'coordinates' },
];

const SearchForm = memo(({
    onLocationFound,
    onInputChange
}) => {
    const [mode, setMode] = useState('city');
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });

    const { data: cityData, isFetching, error: cityError, refetch } = useCity(city, 1, 'en', false);
    const handleCityChange = (value) => {
        setCity(value);
        if (onInputChange) onInputChange();
    };

    const handleLatChange = (value) => {
        setCoordinates(prev => ({ ...prev, latitude: value }));
        if (onInputChange) onInputChange();
    };

    const handleLngChange = (value) => {
        setCoordinates(prev => ({ ...prev, longitude: value }));
        if (onInputChange) onInputChange();
    };

    const handleModeChange = (value) => {
        setMode(value);
        if (onInputChange) onInputChange();
    };

    const handleCitySearch = async () => {
        if (onInputChange) onInputChange();
        if (mode === 'city') {
            const result = await refetch();
            const currentData = result.data;

            if (currentData && currentData.results && currentData.results.length > 0) {
                const { latitude, longitude } = currentData.results[0];
                onLocationFound({ lat: latitude, lng: longitude, name: city });
            } else {
                onLocationFound(null);
            }

        }
    };

    const handleCordSearch = async () => {
        if (onInputChange) onInputChange();

        if (coordinates.latitude && coordinates.longitude) {
            onLocationFound({
                lat: parseFloat(coordinates.latitude),
                lng: parseFloat(coordinates.longitude),
                name: `coordinates: (${coordinates.latitude}, ${coordinates.longitude})`
            });
        }
    }

    return (
        <div className="container mt-5">
            <Radio options={SEARCH_OPTIONS} currentValue={mode} onChange={handleModeChange} className="mb-3"></Radio>
            {mode === 'city' ? (
                <FormInput
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Enter city name"
                    required
                />
            ) : (
                <>
                    <FormInput
                        type="number"
                        value={coordinates.latitude}
                        onChange={handleLatChange}
                        placeholder="Enter latitude"
                        required
                    />
                    <FormInput
                        type="number"
                        value={coordinates.longitude}
                        onChange={handleLngChange}
                        placeholder="Enter longitude"
                        required
                    />
                </>
            )}
            <button className="btn btn-primary mb-3" onClick={mode === 'city' ? handleCitySearch : handleCordSearch} disabled={isFetching}>
                Search
            </button>
            <div className="mt-5 mb-3">{isFetching ? 'Loading...' : ''}</div>
        </div>

    );
});

export default SearchForm;
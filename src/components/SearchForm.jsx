import FormInput from "./FormInput";
import Radio from "./Radio";

const SEARCH_OPTIONS = [
    { label: 'By City', value: 'city' },
    { label: 'By Coordinates', value: 'coordinates' },
];

const SearchForm = ({
    mode,
    setMode,
    city,
    setCity,
    coordinates,
    setCoordinates,
    onSearch,
    loading
}) => {
    return (
        <div>
            <Radio options={SEARCH_OPTIONS} currentValue={mode} onChange={setMode}></Radio>
            {mode === 'city' ? (
                <FormInput
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    required
                />
            ) : (
                <>
                    <FormInput
                        type="number"
                        value={coordinates.latitude}
                        onChange={(e) => setCoordinates({ ...coordinates, latitude: e.target.value })}
                        placeholder="Enter latitude"
                        required
                    />
                    <FormInput
                        type="number"
                        value={coordinates.longitude}
                        onChange={(e) => setCoordinates({ ...coordinates, longitude: e.target.value })}
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
};

export default SearchForm;
const UNKNOWN_ICON = 'wsymbol_0999_unknown.png';

const weatherMap = {
    // --- Ясно (Code 0) ---
    0: {
        d: 'wsymbol_0001_sunny.png',
        n: 'wsymbol_0008_clear_sky_night.png'
    },

    // --- Облачность (Codes 1, 2, 3) ---
    1: { d: 'wsymbol_0002_sunny_intervals.png', n: 'wsymbol_0041_partly_cloudy_night.png' },
    2: { d: 'wsymbol_0002_sunny_intervals.png', n: 'wsymbol_0041_partly_cloudy_night.png' },
    3: { d: 'wsymbol_0003_white_cloud.png', n: 'wsymbol_0042_cloudy_night.png' },

    // --- Туман (Codes 45, 48) ---
    45: { d: 'wsymbol_0006_mist.png', n: 'wsymbol_0006_mist.png' },
    48: { d: 'wsymbol_0007_fog.png', n: 'wsymbol_0007_fog.png' },

    // --- Морось (Codes 51, 53, 55) ---
    51: { d: 'wsymbol_0048_drizzle.png', n: 'wsymbol_0048_drizzle.png' },
    53: { d: 'wsymbol_0048_drizzle.png', n: 'wsymbol_0048_drizzle.png' },
    55: { d: 'wsymbol_0048_drizzle.png', n: 'wsymbol_0048_drizzle.png' },

    // --- Дождь (Codes 61, 63, 65) ---
    61: { d: 'wsymbol_0009_light_rain_showers.png', n: 'wsymbol_0025_light_rain_showers_night.png' },
    63: { d: 'wsymbol_0018_cloudy_with_heavy_rain.png', n: 'wsymbol_0034_cloudy_with_heavy_rain_night.png' },
    65: { d: 'wsymbol_0018_cloudy_with_heavy_rain.png', n: 'wsymbol_0034_cloudy_with_heavy_rain_night.png' },

    71: { d: 'wsymbol_0011_light_snow_showers.png', n: 'wsymbol_0027_light_snow_showers_night.png' },
    73: { d: 'wsymbol_0011_light_snow_showers.png', n: 'wsymbol_0027_light_snow_showers_night.png' },
    75: { d: 'wsymbol_0020_cloudy_with_heavy_snow.png', n: 'wsymbol_0036_cloudy_with_heavy_snow_night.png' },

    80: { d: 'wsymbol_0009_light_rain_showers.png', n: 'wsymbol_0025_light_rain_showers_night.png' },
    81: { d: 'wsymbol_0009_light_rain_showers.png', n: 'wsymbol_0025_light_rain_showers_night.png' },
    82: { d: 'wsymbol_0018_cloudy_with_heavy_rain.png', n: 'wsymbol_0034_cloudy_with_heavy_rain_night.png' },

    95: { d: 'wsymbol_0024_thunderstorms.png', n: 'wsymbol_0040_thunderstorms_night.png' },
    96: { d: 'wsymbol_0024_thunderstorms.png', n: 'wsymbol_0040_thunderstorms_night.png' },
    99: { d: 'wsymbol_0024_thunderstorms.png', n: 'wsymbol_0040_thunderstorms_night.png' },
};
export { weatherMap, UNKNOWN_ICON };
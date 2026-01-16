const fetchData = async (baseUrl, path, params) => {
    const url = new URL(path, baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const res = await fetch(url.toString());
    console.log(res.status);
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
};
// async function fetchData(url) {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch posts");
//     return res.json();
// }
export { fetchData };




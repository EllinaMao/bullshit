const fetchData = async (baseUrl, path, params) => {
    const url = new URL(path, baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    const res = await fetch(url.toString());
    console.log(res.status);
    //to think
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    return res.json();
};

export { fetchData };




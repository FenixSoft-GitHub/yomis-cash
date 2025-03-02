const URL = 'https://pydolarve.org/api/v1/dollar?page=bcv';

export const Tasa1 = async () => {
    try {
        const res = await fetch(URL);
        return await res.json();
    } catch (e) {
        console.error('Error fetching data:', e);
        return null;
    }
};
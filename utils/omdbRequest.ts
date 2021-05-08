import fetch from 'node-fetch';

const omdbRequest = async(name: string, type: string) => {
    let URL = `http://www.omdbapi.com/?t=${name}&type=${type}&apiKey=${process.env.OMDB_API_KEY}`
    let res = await fetch(URL);
    let data = await res.json();
    return data;
}

export default omdbRequest;
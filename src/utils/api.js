const API = "https://api.jikan.moe/v4"
export const getPath = async (path)=>{
    const results = await fetch(API + path);
    if(!results.ok){
        throw new Error('Server error')
    }
    const data = await results.json();
    return data;
}
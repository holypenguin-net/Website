import { httpMethod } from "../types/api";

export async function holyFetch(method: httpMethod, url: string, body?:Object){
    return new Promise(async(resolve, reject) => {
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
        let raw
        let requestOptions
        if(method === 'get'){
            requestOptions = {
               method: method,
               headers: myHeaders,
               redirect: 'follow'
            };
        }else{
            raw = JSON.stringify(body);
            requestOptions = {
               method: method,
               headers: myHeaders,
               body: raw,
               redirect: 'follow'
            };
        }

        await fetch(url, requestOptions as RequestInit)
        .then(res => res.text())
        .then(res => {
            resolve(res); 
        })
        .catch(err => {
            reject(err);
        });
    })
};


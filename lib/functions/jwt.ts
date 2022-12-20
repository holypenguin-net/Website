import jwt from 'jsonwebtoken';

const token = (process.env.JWT_TOKEN as jwt.Secret);

export function sign(value: JSON | object){
    return jwt.sign(value, token);    
};

export function verify(value: string){
    return jwt.verify(value, token); 
};

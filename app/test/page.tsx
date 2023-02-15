"use client"
import { HolyForm } from "../../lib/components/holyform"
import { useState } from "react";
import { httpMethod } from "../../lib/types/api";
import { holyFetch } from "../../lib/functions/holyFetch";

export default function Test(){
    const [formValue, setFormValue] = useState({});

    const handleInput = (input: React.ChangeEventHandler<HTMLInputElement>) => {
        input = input.target;
        setFormValue({
            ...formValue,
            [input.name]: input.value
        }) 
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const method = (event.target as HTMLFormElement).method;
        const data = await holyFetch(method as httpMethod, '/api/TEST', formValue);
        console.log(data);
    };

    return(
        <> 
            <HolyForm header="TEST FORM" onChange={handleInput} onSubmit={handleSubmit} method="post">
                <input type="text" placeholder="Name" name="name"/>
                <input type="password" placeholder="Password" name="password"/>
            </HolyForm>
        </>
    )
}

"use client"
import { HolyForm } from '../../lib/components/holyform';
import style from './login.module.css';
import { useState } from 'react';

export default function Login(){
    return(
        <>
            <HolyForm header="Login">
                <input type="email" name="name" placeholder="Nickname/Email"></input>
                <input type="password" name="password" placeholder="Password"></input>
            </HolyForm>
        </>
    );
}

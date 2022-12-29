"use client"
import { HolyForm } from '../../lib/components/holyform';
import style from './login.module.css';
import { useState } from 'react';

export default function Login(){
        
    let showPassword = false;
    let strength = 0;
    let validations = []

    function checkLogin(e: any) {
        e.preventDefault();
        if(strength4 === style.bar_show) {
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "usr_Email": e.target.email.value,
        "usr_Password": e.target.password.value,
        "keepLogin": false
        });
    
        var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        fetch("http://172.16.0.102:3000/api/user/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(!JSON.parse(result).isError){
                console.log("ANGEMELDET")
            }else{
                console.log("VERPISSDICH")
            }
        })
        .catch(error => console.log('error', error));
        } 
        else {
            console.log("not valide")
        }
    }

    function validatePassword(e:React.ChangeEvent<HTMLInputElement>) {
        const password = e.target.value;

        validations = [
            (password.length >= 8),
            (password.search(/[A-Z]/) > -1),
            (password.search(/[0-9]/) > -1),
            (password.search(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/) > -1),
        ]

        strength = validations.reduce((acc, cur) => acc + +cur, 0)

        switch(strength){
            case 0:
                setStrength1("");
                setStrength2("");
                setStrength3("");
                setStrength4("");
                setPw_Color(style.pw_color_red);
                break;
            case 1:
                setStrength1(style.bar_show);
                setStrength2("");
                setStrength3("");
                setStrength4("");
                setPw_Color(style.pw_color_red);
                break;
            case 2:
                setStrength1(style.bar_show);
                setStrength2(style.bar_show);
                setStrength3("");
                setStrength4("");
                setPw_Color(style.pw_color_red);
                break;
            case 3:
                setStrength1(style.bar_show);
                setStrength2(style.bar_show);
                setStrength3(style.bar_show);
                setStrength4("");
                setPw_Color(style.pw_color_red);
                break;
            case 4:
                setStrength1(style.bar_show);
                setStrength2(style.bar_show);
                setStrength3(style.bar_show);
                setStrength4(style.bar_show);
                setPw_Color(style.pw_color_green);
                break;
            }

        if(validations[0]){
            setCase1("✅");
        }else{
            setCase1("❌");
        }
        if(validations[1]){
            setCase2("✅");
        }else{
            setCase2("❌");
        }
        if(validations[2]){
            setCase3("✅");
        }else{
            setCase3("❌");
        }
        if(validations[3]){
            setCase4("✅");
        }else{
            setCase4("❌");
        }
    }

    // Vars for Passwordcheck
    const [case1, setCase1] = useState("❌");
    const [case2, setCase2] = useState("❌");
    const [case3, setCase3] = useState("❌");
    const [case4, setCase4] = useState("❌");

    // Vars for bar_show
    const [strength1, setStrength1] = useState("");
    const [strength2, setStrength2] = useState("");
    const [strength3, setStrength3] = useState("");
    const [strength4, setStrength4] = useState("");
    
    const [pw_color, setPw_Color] = useState(style.pw_color_red);

    return(
        <>
            <HolyForm header="Login" onSubmit={checkLogin}>
                <input type="email" name="name" placeholder="Nickname/Email"></input>
                <input type={showPassword ? "text" : "password"} className={pw_color} name="password" placeholder="Password" onInput={validatePassword}></input>
                 <div className={style.strength}>
                    <span className={`${style.bar} ${style.barOne} ${strength1}`}/>
                        <span className={`${style.bar} ${style.barTwo} ${strength2}`}/>
                        <span className={`${style.bar} ${style.barThree} ${strength3}`}/>
                        <span className={`${style.bar} ${style.barFour} ${strength4}`}/>

                    </div>

                    <ul>
                        <li> {case1} must be at least 8 characters</li>
                        <li> {case2} must contain a capital letter</li>
                        <li> {case3} must contain a number</li>
                        <li> {case4} must contain a special character&#160;<div className={style.list_horizontal} title="The password must contain at least one of these special characters: &#33;&#34;&#35;&#36;&#37;&#38;&#39;&#40;&#41;&#42;&#43;&#44;&#45;&#46;&#47;&#58;&#59;&#60;&#61;&#62;&#63;&#64;&#91;&#92;&#93;&#94;&#95;&#96;&#123;&#124;&#125;&#126;">&#9432;</div></li>
                        
                   </ul>
            </HolyForm>
        </>
    );
}

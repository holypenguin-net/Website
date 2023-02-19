"use client"
import { HolyForm } from "../../lib/components/holyform/component";
import style from "./page.module.css";
import registerStyle from "./register.module.css";
import { useState } from 'react';
import {holyFetch} from '../../lib/functions/holyFetch';
import {httpMethod} from '../../lib/types/api';

export default function Login(){

    // Fetch login
    const [errorMsg, setErrorMsg] = useState("");
    const [formValue, setFormValue] = useState({});
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        setFormValue({
            ...formValue,
            [input.name]: input.type !== 'checkbox' ? input.value : input.checked,
        });
    };

    const handleSubmit = async (event: React.FormEvent) =>{
        event.preventDefault();
        const target = (event.target as HTMLFormElement);
        const method = target.name === 'login' ? 'post' : 'put';
        const url = target.name === 'login' ? '/api/user/login' : '/api/user/register';
        await holyFetch(method as httpMethod, url, formValue)
        //@ts-ignore
        .then((res: string) => {
            const data = JSON.parse(res as string);
            if(data.isError){
                console.log(data.msg);
                // @ts-ignore
            }else if(target.name !== 'login'){
                // @ts-ignore
                document.getElementById('choice').checked = false;
            }
            if(data.isError){
                setErrorMsg(data.msg.error);
            } else {
                console.log(data.msg.jwt);
            }
        })
        .catch(err => {
            console.log(err.error);;

        });
    };

    // Clear ErrorMsg on form change
    const handleButton = () => {
        setErrorMsg("");
    }

    // Vars for bar_show
    let strength = 0;
    let validations = []
    const [strength1, setStrength1] = useState("");
    const [strength2, setStrength2] = useState("");
    const [strength3, setStrength3] = useState("");
    const [strength4, setStrength4] = useState("");
    
    const validatePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        e.target.setCustomValidity("Password is invalid! See Checkboxes bellow.")
        e.target.style.color = "orangered";
        const pw1 = document.getElementById("pw1") as HTMLInputElement | null;
        const pw2 = document.getElementById("pw2") as HTMLInputElement | null;
        const val1 = document.getElementById("val1") as HTMLInputElement | null;
        const val2 = document.getElementById("val2") as HTMLInputElement | null;
        const val3 = document.getElementById("val3") as HTMLInputElement | null;
        const val4 = document.getElementById("val4") as HTMLInputElement | null;
        const val5 = document.getElementById("val5") as HTMLInputElement | null;

        validations = [
            (password.length >= 8),
            (password.search(/[A-Z]/) > -1),
            (password.search(/[0-9]/) > -1),
            (password.search(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/) > -1),
        ]
        const pwCheck = (pw1 && pw2 && pw1.value === pw2.value);

        //strength = validations.reduce((acc, cur) => acc + +cur, 0)
        strength = validations.reduce((acc, cur) => acc + +cur, 0);

        switch(strength){
            case 0:
                setStrength1("");
                setStrength2("");
                setStrength3("");
                setStrength4("");
                e.target.style.color = "orangered";
                e.target.setCustomValidity("Password is invalid! See Checkboxes bellow.")
                break;
            case 1:
                setStrength1(registerStyle.bar_show);
                setStrength2("");
                setStrength3("");
                setStrength4("");
                e.target.style.color = "orangered";
                e.target.setCustomValidity("Password is invalid! See Checkboxes bellow.")
                break;
            case 2:
                setStrength1(registerStyle.bar_show);
                setStrength2(registerStyle.bar_show);
                setStrength3("");
                setStrength4("");
                e.target.style.color = "orangered";
                e.target.setCustomValidity("Password is invalid! See Checkboxes bellow.")
                break;
            case 3:
                setStrength1(registerStyle.bar_show);
                setStrength2(registerStyle.bar_show);
                setStrength3(registerStyle.bar_show);
                setStrength4("");
                e.target.style.color = "orangered";
                e.target.setCustomValidity("Password is invalid! See Checkboxes bellow.")
                break;
            case 4:
                setStrength1(registerStyle.bar_show);
                setStrength2(registerStyle.bar_show);
                setStrength3(registerStyle.bar_show);
                setStrength4(registerStyle.bar_show);
                e.target.style.color = "yellowgreen";
                e.target.setCustomValidity("")
                break;
            }

            if(val1 != null && val2 != null && val3 != null && val4 != null && val5 != null) {
                if(validations[0]){
                    val1.checked = true; 
                } else {
                    val1.checked = false; 
                }
                if(validations[1]){
                    val2.checked = true; 
                } else {
                    val2.checked = false; 
                }
                if(validations[2]){
                    val3.checked = true; 
                } else {
                    val3.checked = false; 
                }
                if(validations[3]){
                    val4.checked = true; 
                } else {
                    val4.checked = false; 
                }
                if (pwCheck){
                    val5.checked = true;
                    e.target.setCustomValidity("")
                    
                } else if(pw2 != null){
                    val5.checked = false;
                    //setPw_Color(registerStyle.pw_color_red);
                    pw2.setCustomValidity("Password does not match!")
                    pw2.style.color = "orangered";
                }
            }
        }

    return(
        <>
            <div className={style.div_con}>
                <input className={style.checkbox} type="checkbox" id="choice" name="choice" value="creative" onChange={handleButton}/>
                <label className={style.label} htmlFor="choice"></label>

                <div className={style.flip_card}>
                    <div className={style.flip_card_inner}>
                        <div className={style.flip_card_front}>
                            <div>
                                <HolyForm header='Login' name="login" onSubmit={handleSubmit} onChange={handleChange}>
                                    <input type="email" name="usr_Email" placeholder="Email" required/>
                                    <input type="password" name="usr_Password" placeholder="Password" required/>
                                    <input type="checkbox" name="keepLogin" placeholder="Keep me 30 days logged in!"/>
                                    <div className={style.error}>{errorMsg}</div>
                                    <label>Forgot Password?</label>
                                </HolyForm>
                            </div>
                        </div>
                        <div className={style.flip_card_back}>
                            <div>
                                <HolyForm header='Register' name="register" onSubmit={handleSubmit} onChange={handleChange}>
                                    <input type="text" placeholder="Nickname" name="usr_Nickname" required/>
                                    <input type="email" placeholder="E-Mail" name="usr_Email" required/>
                                    <input type="password" id="pw1" name="usr_Password" placeholder="Password" onInput={validatePassword} required/>
                                    <input type="password" id="pw2" name="usr_Password2" placeholder="Password" onInput={validatePassword} required/>
                                    <div className={style.error}>{errorMsg}</div>
                                    <div className={registerStyle.strength}>
                                        <span className={`${registerStyle.bar} ${registerStyle.barOne} ${strength1}`}/>
                                        <span className={`${registerStyle.bar} ${registerStyle.barTwo} ${strength2}`}/>
                                        <span className={`${registerStyle.bar} ${registerStyle.barThree} ${strength3}`}/>
                                        <span className={`${registerStyle.bar} ${registerStyle.barFour} ${strength4}`}/>
                                    </div>

                                    <ul className={registerStyle.ul}>
                                        <li> 
                                            <label className={registerStyle.label_checkbox}>
                                                <input className={registerStyle.input_checkbox} id="val1" type="checkbox" disabled/>
                                                <span className={registerStyle.checkbox}></span>
                                            </label> &nbsp; must be at least 8 characters
                                        </li>
                                        <li>
                                            <label className={registerStyle.label_checkbox}>
                                                <input className={registerStyle.input_checkbox} id="val2" type="checkbox" disabled/>
                                                <span className={registerStyle.checkbox}></span>
                                            </label> &nbsp; must contain a capital letter
                                        </li>
                                        <li>
                                            <label className={registerStyle.label_checkbox}>
                                                <input className={registerStyle.input_checkbox} id="val3" type="checkbox" disabled/>
                                                <span className={registerStyle.checkbox}></span>
                                            </label> &nbsp; must contain a number
                                        </li>
                                        <li>
                                            <label className={registerStyle.label_checkbox}>
                                                <input className={registerStyle.input_checkbox} id="val4" type="checkbox" disabled/>
                                                <span className={registerStyle.checkbox}></span>
                                            </label> &nbsp; must contain a special character&#160;<div className={registerStyle.list_horizontal} title="The password must contain at least one of these special characters: &#33;&#34;&#35;&#36;&#37;&#38;&#39;&#40;&#41;&#42;&#43;&#44;&#45;&#46;&#47;&#58;&#59;&#60;&#61;&#62;&#63;&#64;&#91;&#92;&#93;&#94;&#95;&#96;&#123;&#124;&#125;&#126;">&#9432;</div>
                                        </li>
                                        <li>
                                            <label className={registerStyle.label_checkbox}>
                                                <input className={registerStyle.input_checkbox} id="val5" type="checkbox" disabled/>
                                                <span className={registerStyle.checkbox}></span>
                                            </label> Passwords are the same
                                        </li>
                                    </ul>
                                </HolyForm>
                            </div>
                         </div>
                     </div>
                </div>
            </div>
        </>
    );
};

"use client"
import { HolyForm } from '../../lib/components/holyform';
import style from "./login.module.css";
import registerStyle from "./register.module.css";
import { useState } from 'react';

export default function Login(){

    const [login, setLogin] = useState(style.shown);
    const [register, setRegister] = useState(style.hidden);

    let showPassword = false;
    let strength = 0;
    let validations = []

    function toggle() {
        const log = document.getElementById("login") as HTMLInputElement | null;
        const reg = document.getElementById("register") as HTMLInputElement | null;

        if(log != null && reg != null) {
            if(log.checked) {
                setLogin(style.hidden)
                setRegister(style.shown)
            } else {
                setLogin(style.shown)
                setRegister(style.hidden)
            }
        }
    }

    function validatePassword(e:React.ChangeEvent<HTMLInputElement>) {
        const password = e.target.value;
        const val1 = document.getElementById("val1") as HTMLInputElement | null;
        const val2 = document.getElementById("val2") as HTMLInputElement | null;
        const val3 = document.getElementById("val3") as HTMLInputElement | null;
        const val4 = document.getElementById("val4") as HTMLInputElement | null;

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
                setPw_Color(registerStyle.pw_color_red);
                break;
            case 1:
                setStrength1(registerStyle.bar_show);
                setStrength2("");
                setStrength3("");
                setStrength4("");
                setPw_Color(registerStyle.pw_color_red);
                break;
            case 2:
                setStrength1(registerStyle.bar_show);
                setStrength2(registerStyle.bar_show);
                setStrength3("");
                setStrength4("");
                setPw_Color(registerStyle.pw_color_red);
                break;
            case 3:
                setStrength1(registerStyle.bar_show);
                setStrength2(registerStyle.bar_show);
                setStrength3(registerStyle.bar_show);
                setStrength4("");
                setPw_Color(registerStyle.pw_color_red);
                break;
            case 4:
                setStrength1(registerStyle.bar_show);
                setStrength2(registerStyle.bar_show);
                setStrength3(registerStyle.bar_show);
                setStrength4(registerStyle.bar_show);
                setPw_Color(registerStyle.pw_color_green);
                break;
            }

            if(val1 != null && val2 != null && val3 != null && val4 != null) {
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
        }
    }

    // Vars for bar_show
    const [strength1, setStrength1] = useState("");
    const [strength2, setStrength2] = useState("");
    const [strength3, setStrength3] = useState("");
    const [strength4, setStrength4] = useState("");
    
    const [pw_color, setPw_Color] = useState(registerStyle.pw_color_red);

    return(
        <>
            <div className={style.div_con}>
                <form className={style.form_con}>
                        <input className={style.checkbox} type="radio" onClick={toggle} id="login" name="choice" value="creative" checked/>
                        <label className={style.label} htmlFor="login">Login</label>

                        <input className={style.checkbox} type="radio" onClick={toggle} id="register" name="choice" value="productive"/>
                        <label className={style.label} htmlFor="register">Register</label>
                </form>

                <div className={style.flip_card}>
                    <div className={style.flip_card_inner}>
                        <div className={style.flip_card_front}>
                            <div className={login}>
                                <HolyForm header='Login'>
                                    <input type="email" name="name" placeholder="Nickname"></input>
                                    <input type="password" name="password" placeholder="Password"></input>
                                    <label>Forgot Password?</label>
                                </HolyForm>
                            </div>
                        </div>
                        <div className={style.flip_card_back}>
                            <div className={register}>
                                <HolyForm header='Register'>
                                    <input type="text" placeholder="Nickname"></input>
                                    <input type="email" placeholder="E-Mail"></input>
                                    <input type="password" placeholder="Password" onInput={validatePassword} className={pw_color}></input>
                                    <input type="password" placeholder="Password" className={pw_color}></input>
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
import { ReactNode } from "react";
import {httpMethod} from "../types/api";
import style from './holyform.module.css'; 

type props = {
    onSubmit?: Function | void,
    onChange?: Function | void,
    onInput?: Function | void,
    header: string,
    children: Array<ReactNode>,
    action?: string,
    method?: httpMethod,
}

export const HolyForm = (props: props) => {

    return(
        <>
            <div className={style.con}>
                <div className={style.box}>
                    <h1>{props.header}</h1>
                    {/*@ts-ignore*/}
                    <form className={style.form} onSubmit={props.onSubmit} action={props.action} method={props.method} onChange={props.onChange}>
                        {   
                            // check if child exist and if its more then one
                            (props.children && props.children.length > 0) ? props.children.map((child, index) => {
                                // check if child is type input and not input.type = submit
                                // @ts-ignore
                                if(child.type === 'input' && child.props.type !== 'submit' && child){
                                    return(
                                        <div className={style.field} key={index}>
                                            {/*@ts-ignore*/}
                                            <input className={`${style.input} ${child.props.className}`} type={child.props.type} name={child.props.name} onInput={child.props.onInput} onChange={child.props.onChange} placeholder=" "/>
                                            {/*@ts-ignore*/}
                                            <label className={style.label}>{child.props.placeholder}</label>
                                        </div>
                                    );
                                } else {
                                    return(
                                        <>
                                            {child}
                                        </>
                                    );
                                }
                            }) : props.children ? props.children : " "
                        }
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        </>
    )
}

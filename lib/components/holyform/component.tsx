import { ReactElement, ReactNode } from "react";
import {httpMethod} from "../../types/api";
import style from './component.module.css'; 

type props = {
    onSubmit?: Function | void,
    onChange?: Function | void,
    onInput?: Function | void,
    header?: string,
    children: Array<ReactNode>,
    action?: string,
    method?: httpMethod,
    name?: string,
}

export const HolyForm = (props: props) => {
    return(
        <>
            <div className={style.con}>
                <div className={style.box}>
                    <h1>{props.header}</h1>
                    {/*@ts-ignore*/}
                    <form className={style.form} onSubmit={props.onSubmit} name={props.name} action={props.action} method={props.method} onChange={props.onChange}>
                        {   
                            // check if child exist and if its more then one
                            (props.children && props.children.length > 0) ? props.children.map((childItem, index) => {
                                const child = childItem as ReactElement;
                                
                                // check if child is type input and not input.type = submit
                                if(child.type === 'input' && !['submit', 'checkbox'].includes(child.props.type) && child){
                                    return(
                                        <div className={style.field} key={index}>
                                            <input className={`${style.input} ${child.props.className}`} id={child.props.id} type={child.props.type} name={child.props.name} onInput={child.props.onInput} onChange={child.props.onChange} placeholder=" " required={child.props.required}/>
                                            <label className={style.label}>{child.props.placeholder}</label>
                                        </div>
                                    );
                                } else if(child && child.props.type === 'checkbox') {
                                    return(
                                        <div key={index}>
                                            <input id={child.props.id} type="checkbox" name={child.props.name} onChange={child.props.onChange} placeholder=" " required={child.props.required}/>
                                            <label>{child.props.placeholder}</label>
                                        </div>
                                    );
                                } else {
                                    return(
                                        <div key={index}>
                                            {child}
                                        </div>
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

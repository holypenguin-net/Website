import {ReactNode} from "react";
import style from './holyform.module.css'; 

type props = {
    onSubmit?: Function,
    header: string,
    children: Array<ReactNode>
}

export const HolyForm = (props: props) => {
    return(
        <>
            <div className={style.con}>
                <div className={style.box}>
                    <h1>{props.header}</h1>
                    {/*@ts-ignore*/}
                    <form onSubmit={props.onSubmit}>
                        {   
                            props.children.map(child => {
                                // @ts-ignore
                                if(child.type === 'input' && child){
                                    return(
                                        <>
                                            <div className={style.field}>
                                                {/*@ts-ignore*/}
                                                <input className={`${style.input} ${child.props.className}`} type={child.props.type} name={child.props.name} onInput={child.props.onInput} placeholder=" "></input>
                                                {/*@ts-ignore*/}
                                                <label className={style.label}>{child.props.placeholder}</label>
                                            </div>
                                        </>
                                    );
                                } else {
                                    return(
                                        <>
                                            {child}
                                        </>
                                    );
                                }
                            })
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

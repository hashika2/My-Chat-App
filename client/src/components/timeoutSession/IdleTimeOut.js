import React,{ useRef } from 'react';
import IdleTimer from 'react-idle-timer';


const IdleTimeOut = () =>{
    const idleTimerRef = useRef(null);
    const onIdle = () => {
        console.log("user id idle");
    }
    return(
        <div>
            <IdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}
export default IdleTimeOut;
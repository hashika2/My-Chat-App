import React,{ useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-modal';

Modal.setAppElement('#root');


const IdleTimeOut = () =>{
    const idleTimerRef = useRef(null);
    const [isLoggedIn,setIsLoggedIn] = useState(true);
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const onIdle = () => {
        console.log("user id idle");
        setModalIsOpen(true);
    }
    return(
        <div>
            {
                isLoggedIn ? <h2>hello world</h2> :<h2>hello guest</h2>
            }
            <Modal isOpen={modalIsOpen}>
                <h2> You have been idle for a while</h2>
                <p> You have been logout soon</p>
                <div>
                    <button >Logout me</button>
                    <button >Keep me up</button>
                </div>
            </Modal>
            <IdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}
export default IdleTimeOut;
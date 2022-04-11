import React, { useRef } from "react";
import { Button } from "../widgets/Button";
import { Input } from "../widgets/Input";
import logo from '../images/logo.png';
import { Authenticate } from "../module/logic/Authenticate";
import { Validation } from "../infrastructure/Validation";
import $ from 'jquery';


const auth = new Authenticate();
const validate = new Validation();

export const SignIn = () =>{
    const emailRef = useRef();
    const passwordRef = useRef();
    const recoveryEmailRef = useRef();
    
    const signInRef = useRef();
    const recoverRef = useRef();

    const onSignIn = async() =>{
        if (!validate.isEmailValid(emailRef.current.value)){
            return;
        }
        await auth.signIn(emailRef.current.value, passwordRef.current.value);
    }

    const onRegister = async() =>{
        if (!validate.isEmailValid(recoveryEmailRef.current.value)){
            return;
        }
        await auth.sendResetPasswordToEmail(recoveryEmailRef.current.value);
    }

    const openRecovery = () =>{
        $(signInRef.current).hide('fast');
        $(recoverRef.current).show('fast');
        $(recoveryEmailRef.current).parent().css({border: ''});
    }

    const openSignIn = () =>{
        $(signInRef.current).show('fast');
        $(recoverRef.current).hide('fast');
        $(emailRef.current).parent().css({border: ''});
    }

    return(
        <div className="sign-in-container">
            <div className="sign-in-card">
                <div className="sign-in-side-l">
                    <div className="sign-in-logo-container">
                        <img src={logo} />
                    </div>
                </div>
                <div className="sign-in-side-r">
                    <div ref={signInRef}>
                        <h4>Log in</h4>
                        <Input inputRef={emailRef} title="Email" type="email" />
                        <Input inputRef={passwordRef} title="Password" />
                        <div className="sign-in-forget-pss">
                            <span onClick={openRecovery}>Forget password?</span>
                        </div>
                        <Button onClick={onSignIn} title="Login" />
                    </div>
                    <div ref={recoverRef} hidden>
                        <h4>Recover Account</h4>
                        <Input inputRef={recoveryEmailRef} title="Email" type="email" />
                        <div className="sign-in-forget-pss">
                            <span onClick={openSignIn} style={{color: 'dodgerblue'}}>Login instead</span>
                        </div>
                        <Button onClick={onRegister} title="Send" />
                    </div>
                </div>
            </div>
        </div>
    )
}
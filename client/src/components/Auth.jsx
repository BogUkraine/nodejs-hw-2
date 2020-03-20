import React, { useState } from 'react';
import useHttp from '../hooks/http.hook';

const Auth = () => {
    const {loading, error, request, clearError} = useHttp();
    const [ form, setForm ] = useState({
        login: '',
        password: '',
    });

    const handleForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log(data);
        }
        catch(error){
            console.log('Something went wrong')
        };
    }
    return (
        <div className="auth">
            <div className="auth__modal modal">
                <div className="modal__header">Authentication</div>
                <div className="modal__description">
                    <input
                        type="text"
                        className="modal__login field"
                        placeholder="Login"
                        name="login"
                        onChange={handleForm}/>
                    <input
                        type="password"
                        className="modal__password field"
                        placeholder="Password"
                        name="password"
                        onChange={handleForm}/>
                </div>
                <div className="modal__footer">
                    <button
                        className="modal__button button button--login"
                        >Log in</button>
                    <button
                        className="modal__button button button--sign"
                        onClick={registerHandler}>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;
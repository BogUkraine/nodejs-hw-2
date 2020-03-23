import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/http.hook';
import Warning from './Warning';
import AuthContext from '../context/AuthContext';

const Auth = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {loading, error, request, clearError} = useHttp();
    const [ isFirstCall, setIsFirstCall ] = useState(true);
    const [ isError, setIsError ] = useState(false);
    const [ form, setForm ] = useState({
        login: '',
        password: '',
    });

    useEffect(() => {
        if(!isFirstCall) {
            setIsError(true);
        }
        setIsFirstCall(false);
    }, [error]);

    const handleForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            auth.login(data.token, data.userId);
            console.log(data.message);
        }
        catch(error){
            console.log('Something went wrong')
        };
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        }
        catch(error){
            console.log('Something went wrong')
        };
    };

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
                        onClick={loginHandler}
                        disabled={loading}
                        >Log in</button>
                    <button
                        className="modal__button button button--sign"
                        onClick={registerHandler}
                        disabled={loading}>Sign in</button>
                </div>
            </div>
            <Warning visible={isError} message={error} setVisible={setIsError} clearError={clearError}/>
        </div>
    )
}

export default Auth;
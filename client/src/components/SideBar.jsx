import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useHttp from '../hooks/http.hook';

const SideBar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {request} = useHttp();

    const handleLogOut = () => {
        auth.logout();
        history.push('/');
    };

    const handleDeleteUser = async () => {
        try {
            await request('/api/account/delete', 'DELETE', null, { Authorization: `Bearer ${auth.token}`})
            auth.logout();
            history.push('/');
        }
        catch (error) {
            throw new Error(`Can't delete user`);
        }
        
    };

    return (
        <div className="sidebar">
            <div className="sidebar__user">
                userName
            </div>
            <div className="sidebar__logout">
                <button
                    className="sidebar__delete button button--red"
                    onClick={handleDeleteUser}>
                        Delete account
                </button>
                <button
                    className="sidebar__button button"
                    onClick={handleLogOut}>
                        Log out
                </button>
            </div>
        </div>
    )
}

export default SideBar;
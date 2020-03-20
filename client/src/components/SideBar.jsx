import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SideBar = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleLogOut = () => {
        auth.logout();
        history.push('/');
    }

    return (
        <div className="sidebar">
            <div className="sidebar__user">
                userName
            </div>
            <div className="sidebar__logout">
                <button
                    className="sidebar__button button"
                    onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    )
}

export default SideBar;
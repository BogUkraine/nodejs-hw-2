import React from 'react';

const Warning = ({visible, message, setVisible, clearError}) => {
    const handleError = () => {
        clearError();
        setTimeout(() => setVisible(false), 0)
        
    }
    return (
        <div className="warning" style={{visibility: visible ? 'visible' : 'hidden'}} onClick={handleError}>
            {message}
        </div>
    )
}

export default Warning;
import React from 'react';

const ModalCreate = ({isModalCreateVisible, handleForm, handleSubmit,
    inputTitle, closeModal, loading, inputDescription}) => {
    return (
        <div
            className="modal__overlay"
            style={{display: isModalCreateVisible ? 'flex' : 'none'}}>
            <div className="modal">
                <div className="modal__header">
                    Create todo item 
                </div>
                <div className="modal__description">
                    <input
                        type="text"
                        name="title"
                        className="field field__title"
                        placeholder="Title"
                        onChange={handleForm}
                        ref={inputTitle}/>
                    <textarea
                        name="description"
                        className="field field__description"
                        placeholder="Description"
                        onChange={handleForm}
                        ref={inputDescription}/>
                </div>
                <div className="modal__footer">
                    <button
                        className="modal__button button"
                        onClick={handleSubmit}
                        disabled={loading}>Create</button>
                    <button
                        className="modal__button button"
                        onClick={closeModal}
                        disabled={loading}>Cancel</button>
                </div>
            </div>
        </div>    
    )
}

export default ModalCreate;
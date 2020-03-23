import React from 'react';

const ModalEdit = ({isModalEditVisible, handleForm, 
    inputTitle, closeModal, loading, 
    inputDescription, form, handleChange}) => {
    return (
        <div
            className="modal__overlay"
            style={{display: isModalEditVisible ? 'flex' : 'none'}}>
            <div className="modal">
                <div className="modal__header">
                    Edit todo item 
                </div>
                <div className="modal__description">
                    <input
                        type="text"
                        name="title"
                        className="field field__title"
                        placeholder="Title"
                        onChange={handleForm}
                        ref={inputTitle}
                        value={form.title}/>
                    <textarea
                        name="description"
                        className="field field__description"
                        placeholder="Description"
                        onChange={handleForm}
                        ref={inputDescription}
                        value={form.description}/>
                </div>
                <div className="modal__footer">
                    <button
                        className="modal__button button"
                        onClick={handleChange}
                        disabled={loading}>Edit</button>
                    <button
                        className="modal__button button"
                        onClick={closeModal}
                        disabled={loading}>Cancel</button>
                </div>
            </div>
        </div>    
    )
}

export default ModalEdit;
import React from 'react';

const Todo = ({checkedHandler, handleDelete, item, showModalEdit}) => {
    return (
        <div className="todos__item todo">
            <div className="todo__checker checker">
                <label className="checker__label">
                    <input
                        type="checkbox"
                        className="checker__box"
                        onChange={(event) => checkedHandler(item, event)}
                        defaultChecked={item.isDone}
                        id={item._id}/>
                    <span className="checker__span"></span>
                </label>
            </div>
            <div className="todo__wrapper">
                <div className="todo__nav">
                    <div className="todo__title">{item.title}</div>
                    <div className="todo__icons">
                        <i className="fas fa-edit" onClick={() => showModalEdit(item)}></i>
                        <i className="fas fa-trash-alt" onClick={() => handleDelete(item)}></i>
                    </div>
                </div>
                <div className="todo__description">{item.description}</div>
            </div>
        </div>
    )
};

export default Todo;
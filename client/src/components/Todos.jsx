import React, { useEffect, useContext } from 'react';
import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';

const TodoItems = ({todos = []}) => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();

    const checkedHandler = async (item, event) => {
        console.log(event.target.checked)
        event.target.checked = !event.target.checked;
        const data = await request('/api/todo/check', 'PUT', {...item, isDone: !event.target.checked}, { Authorization: `Bearer ${auth.token}`});
        console.log(data)
    }

    const handleDelete = async (item) => {
        const data = await request('/api/todo/delete', 'DELETE', {...item}, { Authorization: `Bearer ${auth.token}`});
        console.log(data)
    }

    if (todos === []){
        return (
            'You have no todos here'
        )
    }
    return (
        todos.map((item, index) => {
            return (
                <div className="todos__item todo" key={index}>
                    <div className="todo__checker checker">
                        <label className="checker__label">
                            <input
                                type="checkbox"
                                className="checker__box"
                                onChange={(event) => checkedHandler(item, event)}
                                defaultChecked={item.isDone}/>
                            <span className="checker__span"></span>
                        </label>
                    </div>
                    <div className="todo__wrapper">
                        <div className="todo__nav">
                            <div className="todo__title">{item.title}</div>
                            <div className="todo__icons">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-alt" onClick={() => handleDelete(item)}></i>
                            </div>
                        </div>
                        <div className="todo__description">{item.description}</div>
                    </div>
                </div>
            )
        })
    )
};

const Todos = ({todos}) => {
    return (
        <div className="main__todos todos">
            <div className="todos__unchecked todos__list">
                <h2 className="todos__title">In progress</h2>
                <TodoItems todos={todos.filter(item => item.isDone === false)}/>
            </div>
            <div className="todos__checked todos__list">
                <h2 className="todos__title">Done todos</h2>
                <TodoItems todos={todos.filter(item => item.isDone === true)}/>
            </div>
        </div>
    )
}

export default Todos;
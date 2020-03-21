import React, { useState, useRef, useEffect, useContext } from 'react';
import useHttp from '../hooks/http.hook';
import Todos from './Todos';
import AuthContext from '../context/AuthContext';

const Main = () => {
    const auth = useContext(AuthContext);
    const {loading, request} = useHttp();
    const inputTitle = useRef();
    const inputDescription = useRef();
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ todoList, setTodoList ] = useState([]);
    const [ form, setForm ] = useState({
        title: '',
        description: ''
    });

    const handleForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const showModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
        inputTitle.current.value = '';
        inputDescription.current.value = '';
    }

    const handleSubmit = async () => {
        try {
            const data = await request('/api/todo/create', 'POST', {...form}, { Authorization: `Bearer ${auth.token}`});
            setTodoList([...todoList, data]);
            closeModal();
        }
        catch (error) {
            console.log(error);
        };
    }

    const getTodos = async () => {
        try {
            const data = await request('api/todo/', 'GET', null, { Authorization: `Bearer ${auth.token}`});
            setTodoList(data);
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        console.log(todoList)
    }, [todoList]);

    return (
        <div className="main">
            <Todos todos={todoList}/>
            <div
                className="modal__overlay"
                style={{display: isModalVisible ? 'flex' : 'none'}}>
                <div className="modal">
                    <div className="modal__header">Create your todo item</div>
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
                            disabled={loading}>Submit</button>
                        <button
                            className="modal__button button"
                            onClick={closeModal}
                            disabled={loading}>Cancel</button>
                    </div>
                </div>
            </div>
            <button
                className="main__create-button button"
                onClick={showModal}
                disabled={isModalVisible || loading}>+</button>
        </div>
    )
}

export default Main;
import React, { useState, useRef, useEffect, useContext } from 'react';
import useHttp from '../hooks/http.hook';
import Todos from './Todos';
import AuthContext from '../context/AuthContext';
import ModalEdit from './ModalEdit';
import ModalCreate from './ModalCreate';

const Main = () => {
    const auth = useContext(AuthContext);
    const { loading, request } = useHttp();
    const inputTitle = useRef();
    const inputDescription = useRef();
    const [ isModalCreateVisible, setIsModalCreateVisible ] = useState(false);
    const [ isModalEditVisible, setIsModalEditVisible ] = useState(false);
    const [ todoList, setTodoList ] = useState([]);
    const [ form, setForm ] = useState({
        title: '',
        description: ''
    });
    const [ shouldUpdate, setShouldUpdate ] = useState(false);
    const [ todoId, setTodoId ] = useState(null);

    const handleForm = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const showModalCreate = () => {
        setIsModalCreateVisible(true);
    }

    const showModalEdit = (item) => {
        setForm({title: item.title, description: item.description});
        setTodoId(item._id);
        setIsModalEditVisible(true);
    }

    const closeModal = () => {
        setIsModalEditVisible(false);
        setIsModalCreateVisible(false);
        inputTitle.current.value = '';
        inputDescription.current.value = '';
    }

    const handleSubmit = async () => {
        try {
            const data = await request('/api/todo/create', 'POST', {...form}, { Authorization: `Bearer ${auth.token}`});
            setTodoList([...todoList, data]);
            setShouldUpdate(true);
            closeModal();
        }
        catch (error) {
            console.log(error);
        };
    }

    const handleChange = async () => {
        try {
            setShouldUpdate(true);
            await request('/api/todo/edit', 'PUT', {...form, _id: todoId}, { Authorization: `Bearer ${auth.token}`});
            setShouldUpdate(true);
            closeModal();
        }
        catch (error) {
            console.log('Todo wasn\'t changed', error)
        }
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
        return (
            function() {
                setShouldUpdate(false);
            }
        )
    }, [shouldUpdate]);

    return (
        <div className="main">
            <Todos
                todos={todoList}
                showModalEdit={showModalEdit}
                setShouldUpdate={setShouldUpdate}/>
            <ModalEdit
                isModalEditVisible={isModalEditVisible}
                handleForm={handleForm}
                handleChange={handleChange}
                inputTitle={inputTitle}
                closeModal={closeModal}
                loading={loading}
                inputDescription={inputDescription}
                form={form}/>
            <ModalCreate
                isModalCreateVisible={isModalCreateVisible}
                handleForm={handleForm}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                inputTitle={inputTitle}
                closeModal={closeModal}
                loading={loading}
                inputDescription={inputDescription}
                form={form}/>
            <button
                className="main__create-button button"
                onClick={showModalCreate}
                disabled={isModalEditVisible || isModalCreateVisible || loading}>
                    +
            </button>
        </div>
    )
}

export default Main;
import React, { useContext } from 'react';
import useHttp from '../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import Todo from './Todo';

const TodoItems = ({todos = [], setShouldUpdate, showModalEdit}) => {
    const auth = useContext(AuthContext);
    const {request} = useHttp();

    const checkedHandler = async (item, event) => {
        console.log(item);
        try {
            setShouldUpdate(true);
            await request('/api/todo/check',
                'PUT',
                {...item, isDone: event.target.checked},
                { Authorization: `Bearer ${auth.token}`});
            
        }
        catch (error) {
            throw new Error('not changed checker');
        }
    }

    const handleDelete = async (item) => {
        try {
            setShouldUpdate(true);
            await request('/api/todo/delete',
                'DELETE',
                {...item},
                { Authorization: `Bearer ${auth.token}`});
            setShouldUpdate(true);
        }
        catch (error) {
            throw new Error('Todo wasn\'t deleted');
        }
    }

    if (todos === []){
        return (
            'You have no todos here'
        )
    }
    
    return (
        todos.map((item, index) => {
            return (
                <Todo
                    checkedHandler={checkedHandler}
                    handleDelete={handleDelete}
                    showModalEdit={showModalEdit}
                    item={item}
                    key={index}
                />
            )
        })
    )
};

const Todos = ({todos, showModalEdit, setShouldUpdate}) => {
    return (
        <div className="main__todos todos">
            <div className="todos__unchecked todos__list">
                <h2 className="todos__title">In progress ({todos.filter(item => item.isDone === false).length})</h2>
                <TodoItems
                    todos={todos.filter(item => item.isDone === false)}
                    setShouldUpdate={setShouldUpdate}
                    showModalEdit={showModalEdit}/>
            </div>
            <div className="todos__checked todos__list">
                <h2 className="todos__title">Done todos ({todos.filter(item => item.isDone === true).length})</h2>
                <TodoItems
                    todos={todos.filter(item => item.isDone === true)}
                    setShouldUpdate={setShouldUpdate}
                    showModalEdit={showModalEdit}/>
            </div>
        </div>
    )
}

export default Todos;
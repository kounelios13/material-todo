import React from 'react';
import { Checkbox, Button } from '@material-ui/core';


const TodoItem = (props)=>{
    const {todo,toggleTodo,deleteTodo} = props;
    const {title,completed} = todo;
    return <div className='todo-item'>
        <label style={{textDecoration:completed? 'line-through':'none'}}>{title}</label>
        <Checkbox  checked={completed} onChange={()=>toggleTodo(todo)}/>
        <Button variant="contained" onClick={()=>deleteTodo(todo)}>Delete</Button>
    </div>
}
export default TodoItem;
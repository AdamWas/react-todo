import React from 'react';

export default (props) => (
<div
    className='todo-item'
    style={{display: 'flex', justifyContent: 'center'}}>
    <div>
        <input type='checkbox' onClick={props.toggleComplete}/>
    </div>
    <div style={{
        textDecoration: props.todo.complete ? 'line-through': ''}}        
        className='todo-item-label'>
        {props.todo.text}
    </div>
    <button 
    className='remove-item'
    onClick={props.deleteTodo}>x</button>
</div>
)
import React from 'react';
import Button from 'react-bootstrap/Button';
import TodoForm from './TodoForm';
import Todo from './Todo';

export default class TodoList extends React.Component {

    state = {
        todos: [],
        filter: 'all',
        toggleAllComplete: false,
        progressPercent: 10
    }

    updateBar = () => {
        this.setState({
            progressPercent: this.state.todos
            .filter(x => x.complete).length / this.state.todos * 100
        })
    }

    addTodo = (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
        this.updateBar();
    }

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo, //zastepuje ponizsze
                        // id: todo.id,
                        // text: todo.text,
                        complete: !todo.complete
                    }
                    
                } else {
                    return todo;
                }
            })
        });
        this.updateBar();
    };

    deleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(x => x.id !== id)
        });
        this.updateBar();
    };

    deleteCompleted = () => {
        this.setState({
            todos: this.state.todos.filter(x => !x.complete)
        });
        this.updateBar();
    };

    updateFilter = (s) => {
        this.setState({
            filter: s
        });
    };

    render () {
        let todos = [];

        if (this.state.filter === 'all') {
            todos = this.state.todos;
        } else if (this.state.filter === 'active') {
            todos = this.state.todos.filter(x => !x.complete)
        } else if (this.state.filter === 'completed') {
            todos = this.state.todos.filter(x => x.complete)
        }

        return (
        <div className='todo-list'>
            <TodoForm onSubmit={this.addTodo}/>
            <div className='bar'>
                <div className='progress' 
                style={{background: '#ec407a',
                width: `${ this.state.progressPercent }%`}}>
                </div>
            </div>
            {todos.map(todo => (
                <Todo key={todo.id} 
                todo={todo}
                toggleComplete={() => this.toggleComplete(todo.id)}
                deleteTodo={() => this.deleteTodo(todo.id)}/>
            ))}
            
            <div>active todos: {this.state.todos.filter(
                x => !x.complete).length}
            </div>
            <div>{this.state.progressPercent}
                <button onClick={() => this.updateFilter('all')}>
                    all
                </button>
                <button onClick={() => this.updateFilter('active')}>
                    active
                </button>
                <button onClick={() => this.updateFilter('completed')}>
                    completed
                </button>
            </div>
            {this.state.todos.some(x => x.complete) > 0 ? <div>
                <button onClick={() => this.deleteCompleted()}>
                    delete completed
                </button>
            </div> : null}
            {this.state.todos.length ? <div>
                <button onClick={() => this.setState(state => ({ 
                    //lepiej używać jako funkcja, bo async i takie tam
                    todos: state.todos.map(x => ({
                        ...x,
                        complete: !state.toggleAllComplete
                    })),
                    toggleAllComplete: !state.toggleAllComplete
                }))}>
                    Toggle all complete: {`${this.state.toggleAllComplete}`}
                </button>
            </div> : null}
            {JSON.stringify(this.state.todos)}
        </div>
        )
    }
}

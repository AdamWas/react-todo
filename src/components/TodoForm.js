import React from 'react';
import shortid from 'shortid';

export default class TodoForm extends React.Component {

    state = {
        text: '',
        isEnabled: false
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        if (e.target.value !== null) {
            this.setState({isEnabled: true})
        } else {
            this.setState({isEnabled: false})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            text: this.state.text,
            complete: false,
            id: shortid.generate()
        })
        this.setState({
            text: '',
            isEnabled: false
        })
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className='todo-input '
                name = 'text'
                placeholder='to do...'
                value={this.state.text}
                onChange={this.handleChange}/>
                <button 
                disabled ={!this.state.isEnabled}
                onClick={this.handleSubmit}>Add todo</button>
            </form>
        )       
    }
}
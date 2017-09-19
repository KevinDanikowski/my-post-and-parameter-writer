//CommentForm.js
import React, { Component } from 'react';
import style from './style';

class ParameterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { author: '', text: '' };
        this.handleParamChange = this.handleParamChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleParamChange(e) {
        this.setState({ param: e.target.value });
    }
    handleInputChange(e) {
        this.setState({ input: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        let param = this.state.param.trim();
        let input = this.state.input.trim();
        if (!input || !param){
            return;
        }
        this.props.onParamSubmit({ param: param, input: input });
        this.setState({ param: '', input: '' })
    }
    render() {
        return (
            <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
                <input
                    type='text'
                    placeholder='Your parameter…'
                    style={ style.commentFormAuthor}
                    value={ this.state.param }
                    onChange={ this.handleParamChange } />
                <input
                    type='text'
                    placeholder='Say something…'
                    style={ style.commentFormText}
                    value={ this.state.input }
                    onChange={ this.handleInputChange } />
                <input
                    type='submit'
                    style={ style.commentFormPost }
                    value='Post' />
            </form>
        )
    }
}
export default ParameterForm;
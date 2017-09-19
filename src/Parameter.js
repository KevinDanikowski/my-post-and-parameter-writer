//Parameter.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Parameter extends Component {
    constructor(props){
        super(props);
        this.state= {
            toBeUpdated: false,
            param: '',
            input: ''
        };
        //binding all our functions to this class
        this.deleteParam = this.deleteParam.bind(this);
        this.updateParam = this.updateParam.bind(this);
        this.handleParamChange = this.handleParamChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleParamUpdate = this.handleParamUpdate.bind(this);
    }
    updateParam(e){
        e.preventDefault();
        //brings up the update field when we click on the update link
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleParamUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        //if author or text changed, set it. if not, leave null and our PUT
        //request will ignore it.
        let param = (this.state.param) ? this.state.param : null;
        let input = (this.state.input) ? this.state.input : null;
        let parameter = { param: param, input: input };
        this.props.onParamUpdate(id, parameter);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            param: '',
            input: ''
        })
    }
    deleteParam(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onParamDelete(id);
        console.log('Deleted param: ' + this.props.param);
    }
    handleInputChange(e) {
        this.setState({ input: e.target.value });
    }
    handleParamChange(e) {
        this.setState({ param: e.target.value });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div style={ style.comment }>
                <h3>Parameter: {this.props.param}</h3>
                <div dangerouslySetInnerHTML={ this.rawMarkup() } />
                <a style={ style.updateLink } href='#' onClick={ this.updateParam }>update</a>
                <a style={ style.deleteLink } href='#' onClick={ this.deleteParam }>delete</a>
                { (this.state.toBeUpdated)
                    ? (<form onSubmit={ this.handleParamUpdate }>
                        <input
                            type='text'
                            placeholder='Updated parameter…'
                            style={ style.commentFormAuthor }
                            value={ this.state.param }
                            onChange= { this.handleParamChange } />
                        <input
                            type='text'
                            placeholder='Update your answer…'
                            style= { style.commentFormText }
                            value={ this.state.input }
                            onChange={ this.handleInputChange } />
                        <input
                            type='submit'
                            style={ style.commentFormPost }
                            value='Update' />
                    </form>)
                    : null}
            </div>
        )
    }
}
export default Parameter;
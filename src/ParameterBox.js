//ParameterBox.js
import React, { Component } from 'react';
import axios from 'axios';
import ParameterList from './ParameterList';
import ParameterForm from './ParameterForm';
import style from './style';

class ParameterBox extends Component {
    constructor (props) {
        super(props);
        this.state = { data: [] };
        this.loadParamsFromServer = this.loadParamsFromServer.bind(this);
        this.handleParamSubmit = this.handleParamSubmit.bind(this);
        this.handleParamDelete = this.handleParamDelete.bind(this);
        this.handleParamUpdate = this.handleParamUpdate.bind(this);
    }
    loadParamsFromServer(){
        axios.get(this.props.url)
            .then (res => {
                this.setState({ data: res.data });
            })
    }
    handleParamSubmit(param) {
        let params = this.state.data;
        let newParams = params.concat([param]);
        this.setState({ data: newParams });
        axios.post(this.props.url, param)
            .catch(err => {
                console.error(err);
            });
    }
    handleParamDelete(id){
        let url = this.props.url + '/' + id
        axios.delete(url)
            .then(res => {
                console.log('Parameter deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleParamUpdate(id, param){
        let url = this.props.url + '/' + id
        axios.put(url, param)
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadParamsFromServer();
        setInterval(this.loadParamsFromServer, this.props.pollInterval);
    }

    render(){
        return(
            <div style={ style.commentBox }>
                <h2> Parameters: </h2>
                <ParameterList
                    onParamDelete={ this.handleParamDelete }
                    onParamUpdate={ this.handleParamUpdate }
                    data={ this.state.data }/>
                <ParameterForm
                    onParamSubmit={ this.handleParamSubmit }/>
            </div>
        )
    }
}

export default ParameterBox;
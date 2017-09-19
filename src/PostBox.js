//PostBox.js
import React, { Component } from 'react';
import axios from 'axios';
import style from './style';
import PostList from './PostList';

class PostBox extends Component {
    constructor (props) {
        super(props);
        this.state = { data: [], params: [] };
        this.loadSocialPostsFromServer = this.loadSocialPostsFromServer.bind(this);
        this.loadParamsFromServer = this.loadParamsFromServer.bind(this);
    }

    loadSocialPostsFromServer(){
        axios.get(this.props.url)
            .then(res => {
            this.setState ({ data: res.data });
        });
    }

    loadParamsFromServer(){
        axios.get(this.props.paramsUrl)
            .then (res => {
                this.setState({ params: res.data });
            });
    }

    componentWillMount(){
        this.loadParamsFromServer();
        setInterval(this.loadParamsFromServer, this.props.pollInterval );
    }
    componentDidMount(){
        this.loadSocialPostsFromServer();
        //setInterval(this.loadSocialPostsFromServer, this.props.pollInterval);
    }

    render(){
        return(
        <div style={ style.commentBox }>
            <h2> Your Done-For-You Posts!</h2>
            <PostList data={ this.state.data } params={ this.state.params }/>
        </div>
    )
}};

export default PostBox;
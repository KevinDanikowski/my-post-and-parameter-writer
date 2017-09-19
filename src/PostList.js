//PostList.js
import React, { Component } from 'react';
import style from './style';
import Post from './Post';

class PostList extends Component {
    constructor(props){
        super(props);
        this.socialParams = this.socialParams.bind(this);
    }
    socialParams(e){
        e.preventDefault();
        let socialParams = this.props.params;
        return(socialParams);
    }

    render(){
        let socialPostNodes = this.props.data.map((socialPost, index) => {
            return (
                <Post
                    params = { this.props.params }
                    messageNumber = { (index + 1) }
                    message={ socialPost.message}
                    uniqueID={ socialPost['_id'] }
                    key={ socialPost['_id'] } >
                    { socialPost.message }
                </Post>
            )
        }, this);
        let socialPostNodesTable = this.props.data.map((socialPost, index) => {
            return (
                <tr>
                    <th>Post { (index + 1) }:</th>
                    <td>{ socialPost.message }</td>
                <Post
                    params = { this.props.params }
                    messageNumber = { (index + 1) }
                    message={ socialPost.message}
                    uniqueID={ socialPost['_id'] }
                    key={ socialPost['_id'] } >
                    { socialPost.message }
                </Post>
                </tr>
            )
        }, this);
        let socialParamsMap = this.props.params.map(params => {
                return( params.param + ', ' )
            })
        return(
            <div>
                { socialPostNodes }
                <h4> Parameters to Reference: </h4>
                { socialParamsMap }
                <table style={ style.table }>
                    {socialPostNodesTable }
                </table>
            </div>
        )
    }
}

export default PostList;
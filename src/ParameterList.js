//CommentList.js
import React, { Component } from 'react';
import Parameter from './Parameter';
import style from './style';

class ParameterList extends Component {
    render() {
        let paramNodes = this.props.data.map(param => {
            return (
                <Parameter
                    param={ param.param }
                    uniqueID={ param['_id'] }
                    onParamDelete={ this.props.onParamDelete }
                    onParamUpdate={ this.props.onParamUpdate }
                    key={ param['_id'] } >
                    { param.input }
                </Parameter>
            )
        });
        return (
            <div style={ style.commentList }>
                { paramNodes }
            </div>
        )
    }
}
export default ParameterList;
//App.js
import React, { Component } from 'react';
import ParameterBox from './ParameterBox';
import PostBox from './PostBox';

class App extends Component {
     render(){
        return(
            <div>
                <ParameterBox
                    url={'http://localhost:3001/api/params'}
                    pollInterval={4000} />
                <PostBox
                    url={'http://localhost:3001/api/posts'}
                    paramsUrl={'http://localhost:3001/api/params'}
                    pollInterval={8000} />
            </div>
        )
    }
}
export default App;
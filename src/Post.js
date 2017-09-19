//Post.js
import React, { Component } from 'react';

class Post extends Component {
    getFunction = function (string, sub1, sub2) {
        this.string = string;
        //if props empty set timeout
        if (this.props.params[0] == 'undefined') {
            setTimeout(this.getFunction, 500);
            return this.string
        } else {
            this.getAllResults(sub1, sub2);
            return this.string;
    }};
    getAllResults = function (sub1, sub2) {
        //first check to see if we have both substrings
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;
        //find one result
        let result = this.getFromBetween(sub1, sub2);
        //finds parameter result matches
        let match = this.matchBetween(result); //Added by me
        //removes existing sub1, sub2, and stringBetween
        this.removeAndReplace(sub1, sub2, match); //Added by me
        //if there's more substrings
        if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1, sub2);
        } else {        }
    };
    getFromBetween = function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false; // if sub1 or sub2 absent, stops script
        let endSub1 = this.string.indexOf(sub1) + sub1.length; //get length until end sub1
        let string1 = this.string.substr(0, endSub1); //string1 is string to end sub1
        let string2 = this.string.substr(endSub1); //string 2 is string after sub1
        let between = string1.length + string2.indexOf(sub2); // between sub1 and sub2
        return this.string.substring(endSub1, between);
    };
    removeAndReplace = function (sub1, sub2, replacement) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false; // if sub1 or sub2 absent, stops script
        let removal = sub1 + this.getFromBetween(sub1, sub2) + sub2; // remove sub1 stringBetween and sub2
        this.string = this.string.replace(removal, replacement);
        return this.string
    }; //replace removal with nothing
    matchBetween = function (result) {
        let params = this.props.params;
        console.log(this.props.params, result, params.param );
        let input = params.find( x => x.param === result).input;
        console.log (input);
        return input;
    }; //input parameter match returned

    render() {
        return (
            <div>
                <h4> Post { this.props.messageNumber } </h4>
                <strong>Post Template: </strong> { this.props.message }
                <br />
                <strong>Ready Post: </strong>
                { this.getFunction( this.props.message, "{{", "}}" ) }
            </div>
        )
    }
}


export default Post;
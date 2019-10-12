import React, { Component } from 'react';
import {
    Text,
} from 'react-native';


export default class MyText extends Component {
    constructor(props) {
        super(props);
        let that = this;
        this.showDefault = true;
        this.state = {
            reRender: false,
            text: ''
        }
        this.chapterData = null;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.text !== nextProps.text || this.props.style !== nextProps.style || this.state.text !== nextState.text) {
            return true;
        } else {
            return false;
        }
    }
    componentDidMount() {
    }
    static defaultProps = {
        style: null,
        text: ''
    }
    render() {
        let that = this;
        return (
            <Text {...that.props}>{(this.showDefault) ? that.props.text : that.state.text}</Text>
        )
    }

    setText(newText) {
        this.showDefault = false;
        this.setState({ text: newText })
    }
}


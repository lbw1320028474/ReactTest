import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import Category from './ReadPageView/Category'
import List from './ReadPageView/List'
import Recommend from './ReadPageView/Recommend'
import Search from './ReadPageView/Search'
import Topic from './ReadPageView/Topic'
import HDivideLine from './HDivideLine'
import AppUtil from '../Uitls/AppUtils'
import NetWorkUtil from '../NetWorkUtils/NetWorkUtil'

export default class ReadPage extends Component {
    constructor(props) {
        super(props);
        this.state = { isShowScrollView: false }
    }
    render() {
        return (
            <View style={styles.container}>
                <Search></Search>
                {
                    this.state.isShowScrollView ?
                        <ScrollView style={styles.container}>
                            <View style={styles.lineStyle}></View>
                            <Topic></Topic>
                            <Recommend></Recommend>
                            <Category desc={this.state.categoryData} movies={this.state.movies}></Category>
                            <Recommend></Recommend>
                            <Recommend></Recommend>
                            <Recommend></Recommend>
                        </ScrollView>
                        : null
                }
            </View>
        )
    }

    componentWillMount() {
        let jsonUrl = 'https://facebook.github.io/react-native/movies.json';
        let that = this;
        
        NetWorkUtil.getJsonByUrl(jsonUrl,
            function (responseJson) {
                that.setState({
                    isShowScrollView: true,
                    categoryData:responseJson.description,
                    movies:responseJson.movies
                });
                
            }),
            function (error) {
                console.log('请求错误' + error);
            }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lineStyle: {
        backgroundColor: 'gray',
        height: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    }
})

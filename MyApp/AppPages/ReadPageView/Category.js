import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import List from './List'
import RootNavigator from '../../RootNavigator'



export default class Category extends Component {
    static navigationOptions = ({ navigation }) => ({
    });
    constructor(props) {
        super(props);
        this.state = {
            desc: props.desc,
            movies: props.movies
        }
    }
    render() {
        let moviesData = this.state.movies;
        let views = [];
        for (var i in moviesData) {
            if (i >= 2) {
                break;
            }
            views.push(
                <TouchableOpacity key={i} onPress={this._jumpToList.bind(this, moviesData[i].title)}>
                    <Text style={{ fontSize: 30 }} >{moviesData[i].title}</Text>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                {views}
            </View>
        )
    }

    _jumpToList(position) {
        navigation.navigate('ListScreen');
    }
}

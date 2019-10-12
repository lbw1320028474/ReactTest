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
import AppUtils from '../../Uitls/AppUtils'


export default class Recommend extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <View>
                    <Text>推荐专题</Text>
                </View>
                <View>
                    <View style={styles.recommendImageContainerSytle}>
                        <Image style={styles.recommendImageSytle} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511608129617&di=8e126344ab5d1a741525f78b1b3975b6&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0713%2Ffaf906869ca30c6b3eed015c4372b2c6.jpg'}}></Image>
                        <Image style={styles.recommendImageSytle} source={{uri:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511608129617&di=8e126344ab5d1a741525f78b1b3975b6&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0713%2Ffaf906869ca30c6b3eed015c4372b2c6.jpg'}}></Image>
                    </View>
                </View>
                <View>
                    <Text>查看同期更多专题></Text>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    containerStyle:{
        marginTop:10
    },
    recommendImageContainerSytle:{
        flexDirection:'row',
        justifyContent:'center',
        padding:10
    },
    recommendImageSytle:{
        height:75,
        width:AppUtils.size.width/5*2,
        borderRadius:5,
        marginLeft:20
    }
})

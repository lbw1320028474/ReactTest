import React from 'react';
import {
    View,
    Button,
    ScrollView,
    Text,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';

export default class AnimTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
        };
    }

    componentDidMount() {
        Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            {
                toValue: 1, 
                duration: 3000,                            // 透明度最终变为1，即完全不透明
            }
        ).start();                                  // 开始执行动画
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    backgroundColor: '#ff0000',
                    height: 100,
                    width: 100,
                    opacity: this.state.fadeAnim
                }}></Animated.View>
            </View>
        );
    }


}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
});
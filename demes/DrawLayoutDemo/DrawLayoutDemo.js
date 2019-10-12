import React, { Component } from 'react'
import Drawer from 'react-native-drawer'
import HomeScreen from './Page1';
import MineScreen from './Page2';

export default class DrawLayoutDemo extends Component {

    render() {
        return (
            //Material Design Style Drawer
            <Drawer
                type="overlay"
                content={<HomeScreen />}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={10}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
            >
                <MineScreen />
            </Drawer>
        );
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}



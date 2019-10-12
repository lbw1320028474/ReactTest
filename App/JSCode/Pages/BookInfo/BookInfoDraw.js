import React, { Component } from 'react'
import {
    View,
    BackHandler,
    Text
} from 'react-native'
import Drawer from '../../Components/react-native-drawer'
import BookInfoPage from './BookInfoPage';
import GlobleKey from '../../Globle/GlobleKey'
import EventBus from '../../Utils/EventBus'
import AppUtils from '../../Utils/AppUtils'
import BookInfoChapterListView from '../ChapterList/BookInfoChapterListView'
import { observer, inject } from 'mobx-react/native';
@inject('appStore')
export default class BookInfoDrawView extends Component {
    constructor(props) {
        super(props)
        let that = this;
        this.isOpen = false;
        this.drawerRef = null;
        this.chapterListRef = null;
        this.openChapterList = () => {
            if (this.drawerRef && this.drawerRef !== null && !this.isOpen) {
                this.drawerRef.open();
            } else if (this.drawerRef && this.drawerRef !== null && this.isOpen) {
                this.drawerRef.close();
            }
        };
        this.backHandler = () => {
            if (that.isOpen && that.drawerRef) {
                that.drawerRef.close();
                return true;
            } else {
                return false;
            }
        }
    }


    componentWillUnmount() {
        this.props.appStore.bookInfoStore.bookId = '';
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
        EventBus.removeListener(GlobleKey.EVENT_BOOKINFO_OPENCHAPTERLIST, this.openChapterList);
    }

    componentDidMount() {
        let that = this;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
        EventBus.on(GlobleKey.EVENT_BOOKINFO_OPENCHAPTERLIST, this.openChapterList)
    }

    //供外部打开此界面的接口
    static open(navigation, novelId) {
        if (navigation) {
            navigation.navigate('KEY_SceneBookInfoDraw', { bookId: novelId });
        } else {
            alert('参数错误')
        }
    }
    render() {
        // tweenHandler={(ratio) => ({
        //     drawer: { backgroundColor: (2 - ratio) / 2 }
        // })}
        let that = this;
        let bookId = that.props.navigation.state.params.bookId;
        return (
            //Material Design Style Drawer
            <View style={{ flex: 1, width: AppUtils.size.width }}>
                <Drawer
                    ref={ref => this.drawerRef = ref}
                    type="displace"
                    content={<BookInfoChapterListView navigation={that.props.navigation} data={bookId}></BookInfoChapterListView>}
                    onClose={() => {
                        that.isOpen = false;
                        // this.chapterListRef._changeBgOpacity(0)
                    }}
                    onOpen={() => {
                        that.isOpen = true;
                    }}
                    onOpenStart={() => {
                        // this.chapterListRef._changeBgOpacity(1)
                    }}
                    // tweenHandler={(ratio) => ({ main: { backgroundColor: ThemesManager.themesBlackColor }, })}
                    tapToClose={true}
                    openDrawerOffset={0.2} // 20% gap on the right side of drawer
                    panCloseMask={0.2}
                    closedDrawerOffset={0}
                    styles={drawerStyles}
                >
                    <BookInfoPage navigation={that.props.navigation} data={bookId} />
                </Drawer>
            </View>
        );
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { width: AppUtils.size.width },
}



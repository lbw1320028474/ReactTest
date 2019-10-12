import React, { Component } from 'react'
import {
    View,
    BackHandler,
    Text,
    Platform
} from 'react-native'
import Drawer from '../../Components/react-native-drawer'
import BookReadPage from './BookReadPage';
import GlobleKey from '../../Globle/GlobleKey'
import EventBus from '../../Utils/EventBus'
import AppUtils from '../../Utils/AppUtils'
import ReadPageChapterListView from '../ChapterList/ReadPageChapterListView'
import HuyanView from './SubViews/Huyan/HuyanView'
import BGLight from '../../NativeModul/BGLight'
import { observable } from 'mobx'
import Static from './Store/Static'
import { observer, inject } from 'mobx-react/native';
@inject('appStore')
@observer
export default class BookInfoDrawView extends Component {
    constructor(props) {
        super(props)
        let that = this;
        this.systemLight = 1;
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
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
        EventBus.removeListener(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST, this.openChapterList);
        this.props.appStore.readPageStore.resetMenuState();

        // if (Platform.OS === 'android') {
        //     BGLight.setBGLigth(this.systemLight);
        // } else if (Platform.OS === 'ios') {
        //     BGLight.setBGLight(this.systemLight);
        // }
    }

    componentDidMount() {
        let that = this;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
        EventBus.on(GlobleKey.EVENT_READPAGE_OPENCHAPTERLIST, this.openChapterList);
        if (Platform.OS === 'android') {
            BGLight.getBGLigth(
                (light) => {
                    if (light >= 0 && light <= 1) {
                        that.systemLight = light;
                        that.props.appStore.readPageStore.readTheme.bgLightRate = light;
                        Static.systemList = light;
                        // if (that.props.appStore.readPageStore.readTheme.bgLightRate != that.systemLight) {
                        //     // that.props.appStore.readPageStore.readTheme.setLightRate(that.systemLight);
                        //     BGLight.setBGLigth(that.props.appStore.readPageStore.readTheme.bgLightRate);
                        // }
                    }
                },
                (err) => {

                }
            )
        } else if (Platform.OS === 'ios') {
            BGLight.getBGLight((light) => {
                if (light) {
                    let systemLight = parseFloat(light);
                    if (systemLight && systemLight >= 0 && systemLight <= 1) {
                        that.systemLight = systemLight;
                        that.props.appStore.readPageStore.readTheme.bgLightRate = light;
                        Static.systemList = light;
                        // if (that.props.appStore.readPageStore.readTheme.bgLightRate != that.systemLight) {
                        //     // that.props.appStore.readPageStore.readTheme.setLightRate(that.systemLight);
                        //     BGLight.setBGLight(that.props.appStore.readPageStore.readTheme.bgLightRate);
                        // }
                    }
                }
            })
            // BGLight.getBGLight(
            //     (light) => {
            //         if (light >= 0 && light <= 1) {
            //             alert(light)
            //             let light = parseFloat(light);
            //             that.systemLight = light;
            //             if (that.props.appStore.readPageStore.readTheme.bgLightRate != that.systemLight) {
            //                 that.props.appStore.readPageStore.readTheme.setLightRate(that.systemLight);
            //                 BGLight.setBGLight(that.systemLight);
            //             }
            //         }
            //     })
        }

    }

    //供外部打开此界面的接口
    static open(navigation, novelId, chapterId = 1, pageIndex = 0, bookName = '', bookAuthor = '', bookCover = '') {
        if (navigation) {
            navigation.navigate('KEY_SceneBookInfoDrawView', { bookId: novelId, chapterOrder: chapterId, pageIndex: pageIndex, bookName: bookName, bookCover: bookCover, bookAuthor: bookAuthor });
        } else {
            alert('navigaton == null')
        }
    }
    render() {
        // tweenHandler={(ratio) => ({
        //     drawer: { backgroundColor: (2 - ratio) / 2 }
        // })}
        let that = this;
        let novelId = that.props.navigation.state.params.bookId;
        let chapterId = that.props.navigation.state.params.chapterOrder;
        let pageIndex = that.props.navigation.state.params.pageIndex;
        let bookName = '';
        let bookAuthor = '';
        let bookCover = '';
        if (that.props.navigation.state.params.bookName) {
            bookName = that.props.navigation.state.params.bookName;
        }
        if (that.props.navigation.state.params.bookName) {
            bookAuthor = that.props.navigation.state.params.bookAuthor;
        }
        if (that.props.navigation.state.params.bookName) {
            bookCover = that.props.navigation.state.params.bookCover;
        }
        // let bookAuthor = that.props.navigation.state.params.bookAuthor;
        // let bookCover = that.props.navigation.state.params.bookCover;
        return (
            //Material Design Style Drawer
            <View style={{ flex: 1, width: AppUtils.size.width }}>
                <Drawer
                    type="overlay"
                    ref={ref => this.drawerRef = ref}
                    content={<ReadPageChapterListView navigation={that.props.navigation} data={{ novelId: novelId, bookName: bookName, bookCover: bookCover, bookAuthor: bookAuthor }}></ReadPageChapterListView>}
                    onClose={() => {
                        that.isOpen = false;
                        Static.listViewIsOpen = false;
                        // this.chapterListRef._changeBgOpacity(0)
                    }}
                    onOpen={() => {
                        that.isOpen = true;
                        Static.listViewIsOpen = true;
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
                    <BookReadPage navigation={that.props.navigation} data={{ bookId: novelId, chapterOrder: chapterId, pageIndex: pageIndex }} />
                </Drawer>
                <HuyanView></HuyanView>
            </View>
        );
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { width: AppUtils.size.width },
}



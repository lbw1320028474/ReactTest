import { observable, computed, action } from 'mobx'
import EventBus from '../../../Utils/EventBus';
import GlobleKey from '../../../Globle/GlobleKey';
/**
 * 整个App共享数据全部放在这里
 */
export default class SearchStore {
    @observable
    canClean = false;



    /**
     * 热搜词列表
     */
    @observable
    hotSearchList = [];

    /**
     * 搜索历史数据列表
     */
    @observable
    searchHistoryList = [];

    /**
    * 搜索关键词
    */
    @observable
    searchKeWord = '';

    @action
    setSearchWord(newSearchKeyWord) {
        let that = this;
        that.searchKeWord = newSearchKeyWord;
        that.setGessWord('');
        console.log('设置搜索关键词 = ' + newSearchKeyWord);
        EventBus.emit(GlobleKey.EVENT_TO_SEARCH);
    }
    @action
    cleanSearchWord() {
        let that = this;
        that.searchKeWord = '';
    }

    /**
     * 搜索联想词
     */
    @observable
    gessWord = '';

    @action
    setGessWord(newGesWord) {
        let that = this;
        that.gessWord = newGesWord;
    }
    @action
    cleanGessWord() {
        let that = this;
        that.gessWord = '';
    }


    /**
    * 搜索的结果列表
     */
    @observable
    searchBeanList = [];


    @action
    unSiftKeyWord(searchWord) {
        if (searchWord && searchWord.length > 0) {
            let that = this;
            for (let i = 0; i < that.searchHistoryList.length; ++i) {
                if (that.searchHistoryList[i] == searchWord) {
                    return;
                }
            }
            that.searchHistoryList.unshift(searchWord);
            if (that.searchHistoryList.length > 10) {
                that.searchHistoryList.pop();
            }
        }
    }

    @action
    setCanClean(canClean) {
        let that = this;
        if (canClean === false) {
            that.cleanGessWord();
            that.cleanSearchWord();
        }
        that.canClean = canClean;
    }
}




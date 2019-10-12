import TabStore from './TabStore'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        if (sourctData && sourctData !== null) {
            let tabStore = new TabStore();
            if (sourctData.navis && sourctData.navis.length > 0) {

                sourctData.navis.map((item, index) => {
                    if (item.naviType === 1) {
                        tabStore.tab_01_id = item.naviId;
                        tabStore.tab_01_name = item.naviName;
                        tabStore.tabBookCaseImageNormal = { uri: item.iconPicUrl };
                        tabStore.tabBookCaseImageSelected = { uri: item.iconClickPicUrl };
                    } else if (item.naviType === 2) {
                        tabStore.tab_02_id = item.naviId;
                        tabStore.tab_02_name = item.naviName;
                        tabStore.tabBookRoomImageNormal = { uri: item.iconPicUrl };
                        tabStore.tabBookRoomImageSelected = { uri: item.iconClickPicUrl };
                    } else if (item.naviType === 4) {
                        tabStore.tab_04_id = item.naviId;
                        tabStore.tab_04_name = item.naviName;
                        tabStore.tabCategoryImageNormal = { uri: item.iconPicUrl };
                        tabStore.tabCategoryImageSelected = { uri: item.iconClickPicUrl };
                    } else if (item.naviType === 7) {
                        tabStore.tab_05_id = item.naviId;
                        tabStore.tab_05_name = item.naviName;
                        tabStore.tabRankImageNormal = { uri: item.iconPicUrl };
                        tabStore.tabRankImageSelected = { uri: item.iconClickPicUrl };
                    }
                })
            }
            return tabStore;
        } else {
            return null;
        }
    }
}
        // console.log('jsong数据 =' + JSON.stringify(sourctData));


import {
    observable,
    // computed,
    // action
} from 'mobx'
import ImageResource from '../../../../Resource/ImageResource'
import { observer } from 'mobx-react/native';
export default class TabStore {
    @observable selectedPage = 'BookRoomPage';
    @observable tabBookCaseImageNormal = ImageResource.tabBookCaseImageNormal;
    @observable tabBookCaseImageSelected = ImageResource.tabBookCaseImageSelected;
    @observable tabBookRoomImageNormal = ImageResource.tabBookRoomImageNormal;
    @observable tabBookRoomImageSelected = ImageResource.tabBookRoomImageSelected;
    @observable tabCategoryImageNormal = ImageResource.tabCategoryImageNormal;
    @observable tabCategoryImageSelected = ImageResource.tabCategoryImageSelected;
    @observable tabSearchImageNormal = ImageResource.tabSearchImageNormal;
    @observable tabSearchImageSelected = ImageResource.tabSearchImageSelected;
    @observable tabRankImageNormal = ImageResource.tabRankImageNormal;
    @observable tabRankImageSelected = ImageResource.tabRankImageSelected;


    @observable tab_01_name = '书架';
    @observable tab_01_id = 1;
    @observable tab_02_name = '书库';
    @observable tab_02_id = 2;
    @observable tab_03_name = '搜索';
    @observable tab_03_id = 3;
    @observable tab_04_name = '分类';
    @observable tab_04_id = 4;
    @observable tab_05_name = '排行';
    @observable tab_05_id = 7;
}
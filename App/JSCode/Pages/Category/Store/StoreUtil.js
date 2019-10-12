import CategoryStore from './CategoryStore'
import CategoryBean from './CategoryBean'
import CategoryGroupBean from './CategoryGroupBean'
import MySorage from '../../../Utils/MyStore/MySorage'
import GlobleKey from '../../../Globle/GlobleKey'
export default class StoreUtil {
    /**
     * 从源数据格式化成store以便统一数据格式
     */
    static formatStore(sourctData) {
        if (sourctData && sourctData !== null) {
            let categoryStore = new CategoryStore();
            if (sourctData.navi && sourctData.navi.modules && sourctData.navi.modules.length > 0) {
                categoryStore.categoryGroupList = sourctData.navi.modules.map((item, index) => {
                    let categoryGroupBean = StoreUtil.getGroupList(item);
                    if (categoryGroupBean && categoryGroupBean !== null && categoryGroupBean.categoryList.length > 0) {
                        // categoryGroupBean.categoryGroupCover = item.;
                        // categoryGroupBean.categoryGroupName = item.moduleName;
                        return categoryGroupBean;
                    }
                })
                return categoryStore;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }


    static getGroupList(data) {
        if (data) {
            let categoryGroupBean = new CategoryGroupBean();
            categoryGroupBean.categoryGroupName = data.moduleName;
            categoryGroupBean.categoryList = StoreUtil.getSubList(data);
            if (categoryGroupBean.categoryList && categoryGroupBean.categoryList !== null && categoryGroupBean.categoryList.length > 0) {
                categoryGroupBean.categoryGroupCover = categoryGroupBean.categoryList[0].categoryCover;
                return categoryGroupBean;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    static getSubList(data) {
        try {
            if (data && data.groups && data.groups.length > 0) {
                let subList = [];
                subList = data.groups.map((item, index) => {
                    let category = new CategoryBean();
                    category.categoryId = item.groupId;
                    category.categoryCover = item.iconPicUrl;
                    category.categoryName = item.groupName;
                    category.categoryCount = item.bookCount;
                    return category;
                })
                if (subList && subList.length > 0) {
                    return subList;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.log(JSON.stringify(error))
        }

    }
}
        // console.log('jsong数据 =' + JSON.stringify(sourctData));


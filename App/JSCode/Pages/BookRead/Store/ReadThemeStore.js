import { observable, computed, action } from 'mobx'
import ReadTheme from '../Theme/ReadTheme'
import AppUtils from '../../../Utils/AppUtils'
import GlobleKey from '../../../Globle/GlobleKey'
import MySorage from '../../../Utils/MyStore/MySorage'
/**
 * 阅读页主题样式
 */
export default class ReadThemeStore {
    constructor() {

    }

    /**
     * 主题样式
     */
    @observable
    themeType = 0;

    @observable
    bgLightRate = 1;    //背景灯光亮度

    @observable
    themeName = '白色经典';

    @observable
    mainBgColor = '#FFFFFF';     //界面背景颜色

    @observable
    mainTextColor = '#141414';       //界面文字颜色

    @observable
    readBgColor = '#F2F2F2';     //如果背景不是是图片，则该字段不能为空

    @observable
    readTextColor = '#1D1D1D';    //阅读页文字颜色

    @observable
    hightBgColor = '#45CAB9';    //高亮背景颜色

    @observable
    hightTextColor = '#45CAB9';    //高亮文字颜色

    @observable
    stressColor = '#C5ECE7';       //强调颜色

    @observable
    bgIsImage = false;        //阅读背景是否是图片

    /**
 * 翻页类型， 0：无， 1：滑动, 2:覆盖
 */
    @observable
    scrollType = 1;
    /**
     * 每行文字个数，用屏幕宽度除以每行文字数得到文字大小，这样可以让在不同的手机都显示同样的效果
     */
    @observable
    lineTextCount = 20;

    setLightRate(newBgLight) {
        if (newBgLight >= 0 && newBgLight <= 1) {
            this.bgLightRate = newBgLight;
        }
        this._saveTheme();
    }

    setScrollType(scrollType) {
        this.scrollType = scrollType;
        this._saveTheme();
    }


    setThemes(theme) {
        if (theme) {
            this.lineTextCount = theme.lineTextCount;
            this.bgLightRate = theme.bgLightRate;
            this.lineHeight = theme.lineHeight;
            this.themeType = theme.themeType;
            this.textSize = theme.textSize;
            this.lineHeightRate = theme.lineHeightRate;
            this.isHuyan = theme.isHuyan;
            this.scrollType = theme.scrollType;
            this.setThemeType(this.themeType);

        }
        // bgLightRate: this.bgLightRate,
        //     lineTextCount: this.lineTextCount,
        //     lineHeight: this.lineHeight,
        //     themeType: this.themeType,
        //     lineHeightRate: this.lineHeightRate,
        //     isHuyan: this.isHuyan
    }

    _saveTheme() {
        MySorage._sava(GlobleKey.KeyReadThemes, {
            bgLightRate: this.bgLightRate,
            lineTextCount: this.lineTextCount,
            lineHeight: this.lineHeight,
            textSize: this.textSize,
            themeType: this.themeType,
            lineHeightRate: this.lineHeightRate,
            scrollType: this.scrollType,
            isHuyan: this.isHuyan
        })
    }

    @action
    setLineTextCount(newLineTextCount) {
        if (newLineTextCount && newLineTextCount >= 16 && newLineTextCount <= 24) {
            this.lineTextCount = newLineTextCount;
            this.textSize = AppUtils.size.width / AppUtils.textScale / this.lineTextCount;
            this.lineHeight = this.textSize * this.lineHeightRate;
        }
        this._saveTheme();
    }

    @action
    setIsHuyan(isHuyan) {
        this.isHuyan = isHuyan;
        this._saveTheme();
    }

    /**
     * 文字大小，根据每行文字个数计算得到
     */
    @observable
    textSize = AppUtils.size.width / AppUtils.textScale / 20;

    /**
     * 行高相对于文字大小的倍数
     */
    @observable
    lineHeightRate = 1.6;
    @action
    setLineHeightRate(newLineHeightRate) {
        if (newLineHeightRate && newLineHeightRate > 1 && newLineHeightRate < 5) {
            this.lineHeightRate = newLineHeightRate;
            this.lineHeight = this.textSize * this.lineHeightRate;
        }
        this._saveTheme();
    }



    /**
     * 行高，根据文字大小和行高比例计算得到
     */
    @observable
    lineHeight = AppUtils.size.width / AppUtils.textScale / 20 * 1.6;

    /**
         * 行高，根据文字大小和行高比例计算得到
         */
    @observable
    isHuyan = false;
    /**
     * 改变主题样式
     * @param {} themeType 
     */
    @action
    setThemeType(themeType) {
        this.themeName = ReadTheme.themes[themeType].themeName;
        this.mainBgColor = ReadTheme.themes[themeType].mainBgColor;
        this.mainTextColor = ReadTheme.themes[themeType].mainTextColor;
        this.readBgColor = ReadTheme.themes[themeType].readBgColor;
        this.readTextColor = ReadTheme.themes[themeType].readTextColor;
        this.hightBgColor = ReadTheme.themes[themeType].hightBgColor;
        this.hightTextColor = ReadTheme.themes[themeType].hightTextColor;
        this.stressColor = ReadTheme.themes[themeType].stressColor;
        this.bgIsImage = ReadTheme.themes[themeType].bgIsImage;
        this.bgImage = ReadTheme.themes[themeType].bgImage;
        this.themeType = themeType;

        this._saveTheme();
    }
}




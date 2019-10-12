import { observable, computed, action } from 'mobx'
/**
 * 这里全部对主题样属性使用静态变量，这样有利于后期要做App更换主题的功能做好预留
 * Author leibang wen
 */
export default class AppTheme {
    @observable
    mainColor = '#ffffff';        //主要色 白色
    @observable
    hightLightColor = '#45CAB9';       //高亮色
    @observable
    mainBgColor = '#ffffff';       //主要背景颜色
    @observable
    bgHightColor = '#f8f8f8';      //背景区分色-一般比背景暗一些或者亮一些
    @observable
    mainTextColor = '#666666';         //主要文字颜色
    @observable
    hightLightTextColor = '#45CAB9';         //高亮文字颜色
    @observable
    subTextColor = '#9f9f9f';         //浅色文字颜色    
    @observable
    groupTitleTextColor = '#333333';        //分组标题颜色
    @observable
    greyTextColor = '#999999';         //灰色
    @observable
    greyBgColor = '#f5f5f5';         //灰色背景

    @observable
    lowGreyTextColor = '#cccccc';         //low灰色
    @observable
    devideLineColor = '#eeeeee';         //分割线


}
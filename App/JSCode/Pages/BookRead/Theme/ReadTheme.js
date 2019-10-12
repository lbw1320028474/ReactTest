import ImageResource from '../../../../Resource/ImageResource'
export default class ReadTheme {
    static themes = [{
        themeName: '白色经典',
        mainBgColor: '#FFFFFF',     //界面背景颜色
        mainTextColor: '#141414',       //界面文字颜色
        readBgColor: '#F2F2F2',     //如果背景不是是图片，则该字段不能为空
        readTextColor: '#1D1D1D',    //阅读页文字颜色
        hightBgColor: '#45CAB9',    //高亮背景颜色
        hightTextColor: '#45CAB9',    //高亮文字颜色
        stressColor: '#C5ECE7',       //强调颜色
        bgIsImage: false,        //阅读背景是否是图片
        // bgImage:''      //如果背景是图片，则该字段不能为空
    },
    {
        themeName: '黑色护眼',
        mainBgColor: '#2F2E2F',     //界面背景颜色
        mainTextColor: '#6D6D6D',       //界面文字颜色
        readBgColor: '#242424',     //如果背景不是是图片，则该字段不能为空
        readTextColor: '#747474',    //阅读页文字颜色
        hightBgColor: '#45CAB9',    //高亮背景颜色
        hightTextColor: '#45CAB9',    //高亮文字颜色
        stressColor: '#3C3C3C',       //强调颜色
        bgIsImage: false,        //阅读背景是否是图片
        // bgImage: ImageResource.readBg_01       //如果背景是图片，则该字段不能为空
    },
    {
        themeName: '纸质牛皮',
        mainBgColor: '#F9E2BC',     //界面背景颜色
        mainTextColor: '#4B290D',       //界面文字颜色
        readBgColor: '#F1DBB3',     //如果背景不是是图片，则该字段不能为空
        readTextColor: '#553417',    //阅读页文字颜色
        hightBgColor: '#E89406',    //高亮背景颜色
        hightTextColor: '#E89406',    //高亮文字颜色
        stressColor: '#F9EDDA',       //强调颜色
        bgIsImage: true,        //阅读背景是否是图片
        bgImage: ImageResource.readBg_01       //如果背景是图片，则该字段不能为空
    },
    {
        themeName: '粉红诱惑',
        mainBgColor: '#F1E0E6',     //界面背景颜色
        mainTextColor: '#57172B',       //界面文字颜色
        readBgColor: '#F4D6E0',     //如果背景不是是图片，则该字段不能为空
        readTextColor: '#430116',    //阅读页文字颜色
        hightBgColor: '#E26892',    //高亮背景颜色
        hightTextColor: '#E26892',    //高亮文字颜色
        stressColor: '#FDEEF3',       //强调颜色
        bgIsImage: false,        //阅读背景是否是图片
        // bgImage: ImageResource.readBg_01       //如果背景是图片，则该字段不能为空
    },
    {
        themeName: '高贵蓝色',
        mainBgColor: '#DCEEFF',     //界面背景颜色
        mainTextColor: '#394A74',       //界面文字颜色
        readBgColor: '#C5E0FC',     //如果背景不是是图片，则该字段不能为空
        readTextColor: '#3F517A',    //阅读页文字颜色
        hightBgColor: '#1589FD',    //高亮背景颜色
        hightTextColor: '#1589FD',    //高亮文字颜色
        stressColor: '#EDF6FE',       //强调颜色
        bgIsImage: false,        //阅读背景是否是图片
        // bgImage: ImageResource.readBg_01       //如果背景是图片，则该字段不能为空
    },
    ]
}
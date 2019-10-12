export default class Line {
    lineType = -1;   //行类型   //0：第一行， 1：中间行，2:最后行， 3：是第一行也是最后一行
    lineContent = '';   //行内容
    lineWidth = 0;  //行宽
    lineScale = 1;  //行显示比例，用于对文字排版时缩放
}
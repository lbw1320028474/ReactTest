import React, { Component } from 'react';
import {
    Dimensions,
    PixelRatio
} from 'react-native';
import Page from '../PageBean/Page'
import Line from '../PageBean/Line'
import AppUtils from '../../../../../Utils/AppUtils'
module.exports = {
    // getTextByteLength: function (val) {
    //     var len = 0;
    //     if (!val) {
    //         return len;
    //     }
    //     for (var i = 0; i < val.length; i++) {
    //         if (!val[i]) {
    //             continue;
    //         }
    //         // 全角
    //         if (val[i].match(/[^\x00-\xff]/ig) != null) {
    //             len += 2;
    //         } else {
    //             len += 1;
    //         }
    //     }
    //     return len;
    // },
    getSectionList: function (content) {
        let newStr = JSON.stringify(content);
        if (newStr && newStr !== null) {

            newStr = newStr.replace(/\ +/g, "");    //去掉所有空格
            newStr = newStr.replace(/[\r\n]/g, "");     //去掉所有换行和回车
            let stringSections;
            if (newStr && newStr.indexOf('\\n\\n') >= 0) {
                stringSections = newStr.split('\\n\\n');        //以\n\n进行分段
            } else if (newStr && newStr.indexOf('\\n') >= 0) {
                stringSections = newStr.split('\\n');        //以\n\n进行分段
            }
            if (stringSections && stringSections.length > 0) {
                stringSections = stringSections.map((str, index) => {
                    str = str.replace('　　', '').replace('<p>', '');
                    if (str.length > 0) {
                        return str;
                    }
                })
                return stringSections;
            } else {
                return [newStr]
            }
        } else {
            return null;
        }
    },
    // getTextByByteLength: function (val, len) {
    //     //校验参数
    //     if (!val || !len || len === 0) {
    //         return '';
    //     }
    //     let strLength = val.length;
    //     let resourseStr = '';
    //     let resourseLen = 0;
    //     if (strLength <= len / 2) {    //如果给定长度的一半比字符串字数还多，直接返回字符串,原因自己想
    //         return val;
    //     }
    //     for (let i = 0; i < strLength; ++i) {
    //         if (val[i].match(/[^\x00-\xff]/ig) != null) {
    //             if (resourseLen + 2 >= len) {
    //                 return resourseStr;
    //             } else {
    //                 resourseLen += 2;
    //                 resourseStr += val[i];
    //             }
    //         } else {
    //             if (resourseLen + 1 >= len) {
    //                 return resourseStr;
    //             } else {
    //                 resourseLen += 1;
    //                 resourseStr += val[i];
    //             }
    //         }
    //     }
    // },
    textDivideLines: function (textInfo, sectionArray, textCount) {     //文本分行
        lineTextCount = textCount - 2;
        let lines = [];
        //console.log(textInfo);
        if (sectionArray && sectionArray.length > 0) {
            for (let s = 0; s < sectionArray.length; ++s) {
                let lineStr = '';
                let lineCount = 2;
                let isFirstLine = true;
                if (sectionArray[s]) {

                } else {
                    continue;
                }
                for (let i = 0; i < sectionArray[s].length; ++i) {
                    let charLength = 0;
                    if (sectionArray[s][i].match(/[^\x00-\xff]/ig) != null) {
                        switch (sectionArray[s][i]) {
                            case '‘':
                            case '’':
                                charLength = textInfo.danyinghao;
                                break;
                            case "“":
                            case "”":
                                charLength = textInfo.shuangyinghao;
                                break;
                            default:
                                charLength = 1;
                                break;
                        }
                    } else {
                        if (sectionArray[s][i].charCodeAt() >= 65 && sectionArray[s][i].charCodeAt() <= 90) {
                            if (sectionArray[s][i] === 'I') {
                                charLength = textInfo.dazimui;
                            } else {
                                charLength = textInfo.daxie;
                            }
                        } else if (sectionArray[s][i].charCodeAt() >= 97 && sectionArray[s][i].charCodeAt() <= 122) {
                            if (sectionArray[s][i] === 'i') {
                                charLength = textInfo.xiaozimui;
                            } else {
                                charLength = textInfo.xiaoxie;
                            }
                        } else {
                            charLength = textInfo.xiaoxie;
                        }
                    }
                    // console.log(lineCount + " + " + charLength + " + " + lineTextCount);
                    if (lineCount + charLength > lineTextCount && i < sectionArray[s].length - 1) {
                        let subLine = new Line();
                        subLine.lineContent = lineStr;
                        if (isFirstLine) {
                            subLine.lineType = 0;       //段的第一行
                        } else {
                            subLine.lineType = 1;   //段的中间行
                            subLine.lineScale = 1;
                        }
                        // console.log(subLine)
                        subLine.lineWidth = lineCount;
                        subLine.lineScale = lineTextCount / lineCount;
                        //console.log(subLine.lineWidth + " + " + subLine.lineScale);
                        lines.push(subLine);
                        lineStr = '';
                        lineCount = 0;
                        isFirstLine = false;
                    }
                    lineStr += sectionArray[s][i];
                    lineCount += charLength;
                    if (i === sectionArray[s].length - 1) {
                        let subLine = new Line();
                        subLine.lineContent = lineStr;
                        if (isFirstLine) {
                            subLine.lineType = 3;       //段的第一行,也是最后一行
                        } else {
                            subLine.lineType = 2;   //段的最后一行
                        }
                        subLine.lineScale = 1;
                        // console.log(subLine)
                        subLine.lineWidth = lineCount;
                        //console.log(subLine.lineWidth + " + " + subLine.lineScale);
                        lines.push(subLine);
                        lineStr = '';
                        lineCount = 0;
                        isFirstLine = false;
                    }
                }
            }
        }
        return lines;
    },
    textDividePages(chapterName, lines, lineHeight, bookId, chapterOrder) {        //对分行号的文本进行分页
        let pages = [];
        if (lines && lines.length > 0) {
            let isFirstPage = true;
            lineOffsetY = lineHeight * 3;        //每章节第一页空三行来显示章节标题
            let page = new Page();
            page.chapterOrder = chapterOrder;
            page.chapterName = chapterName;
            page.bookId = bookId;
            let pageIndex = 1;
            for (let i = 0; i < lines.length; ++i) {
                let newLineSpace = (lines[i].lineType === 0) ? lineHeight * 1.3 : lineHeight;
                if (lineOffsetY + newLineSpace > (AppUtils.size.height - (lineHeight * 2))) {
                    if (isFirstPage) {
                        page.pageType = 0;
                    } else {
                        page.pageType = 1;
                    }
                    page.pageIndex = pageIndex;
                    pages.push(page);
                    page = new Page();
                    page.chapterOrder = chapterOrder;
                    page.chapterName = chapterName;
                    page.bookId = bookId;
                    isFirstPage = false;
                    pageIndex += 1;
                    lineOffsetY = 0;
                    if (i != lines.length - 1) {
                        i = i - 1;
                    }
                } else {
                    page.lines.push(lines[i]);
                    //console.log('push行数据:' + JSON.stringify(lines[i]))
                    if (lines[i].lineType === 2 || lines[i].lineType === 3) {
                        lineOffsetY += (lineHeight * 1.3);
                    } else {
                        lineOffsetY += lineHeight;
                    }
                }
                if (i === lines.length - 1) {
                    page.pageIndex = pageIndex;
                    if (page.lines.length === 0) {
                        page.lines.push(lines[i]);
                    }
                    if (isFirstPage) {
                        page.pageType = 3;
                    } else {
                        page.pageType = 2;
                    }
                    pages.push(page);
                }
            }
        }
        // console.log("分页结果:" + JSON.stringify(pages))
        return pages;
    }
}
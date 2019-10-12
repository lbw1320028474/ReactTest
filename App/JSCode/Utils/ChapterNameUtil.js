export default class ChapterNameUtil {
    static formatChapterName(chapterName, chapterOrder) {
        try {
            if (chapterName && chapterName.length > 0) {
                let newChapterName = chapterName;
                let startIndex = newChapterName.indexOf('第');
                let endIndex = newChapterName.indexOf('章');
                if (startIndex >= 0 && endIndex >= 0 && endIndex > startIndex) {
                    newChapterName = newChapterName.replace(' ', '');
                    endIndex = newChapterName.indexOf('章');
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                startIndex = newChapterName.indexOf('第');
                endIndex = newChapterName.indexOf('回');
                if (startIndex >= 0 && endIndex >= 0 && endIndex > startIndex) {
                    newChapterName = newChapterName.replace(' ', '');
                    endIndex = newChapterName.indexOf('回');
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                startIndex = newChapterName.indexOf('第');
                endIndex = newChapterName.indexOf('卷');
                if (startIndex >= 0 && endIndex >= 0 && endIndex > startIndex) {
                    newChapterName = newChapterName.replace(' ', '');
                    endIndex = newChapterName.indexOf('卷');
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf(' ');
                if (endIndex >= 0) {
                    newChapterName = newChapterName.replace(' ', '')
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf(':');
                if (endIndex >= 0) {
                    newChapterName = newChapterName.replace(':', '')
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf('：');
                if (endIndex >= 0) {
                    newChapterName = newChapterName.replace('：', '')
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf('章');
                if (endIndex >= 0) {
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf('回');
                if (endIndex >= 0) {
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf('卷');
                if (endIndex >= 0) {
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                endIndex = newChapterName.indexOf('次');
                if (endIndex >= 0) {
                    newChapterName = '第' + chapterOrder + '章 ' + newChapterName.substring(endIndex + 1);
                    return newChapterName;
                }
                newChapterName = '第' + chapterOrder + '章 ' + newChapterName;
                return newChapterName;
            } else {
                return chapterName;
            }
        } catch (error) {
            return chapterName;
        }


    }
}
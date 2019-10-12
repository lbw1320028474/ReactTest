export default class DateUtil {
    static format(format = 'YY-MM-DD hh:mm') {
        date = new Date();
        var o = {
            'M+': date.getMonth() + 1, //month
            'd+': date.getDate(), //day
            'H+': date.getHours(), //hour+8小时
            'h+': date.getHours(), //hour+8小时
            'm+': date.getMinutes(), //minute
            's+': date.getSeconds(), //second
            'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
            'S': date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp('(' + k + ')').test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));

        return format;
    }
    // dateFormat = function (date, format) {
    //     date = new Date(date);
    //     var o = {
    //         'M+': date.getMonth() + 1, //month
    //         'd+': date.getDate(), //day
    //         'H+': date.getHours() + 8, //hour+8小时
    //         'm+': date.getMinutes(), //minute
    //         's+': date.getSeconds(), //second
    //         'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    //         'S': date.getMilliseconds() //millisecond
    //     };
    //     if (/(y+)/.test(format))
    //         format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

    //     for (var k in o)
    //         if (new RegExp('(' + k + ')').test(format))
    //             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));

    //     return format;
    // }
    // dateFtt(fmt, date) { //author: meizz   
    //     var o = {
    //         "M+": date.getMonth() + 1,                 //月份   
    //         "d+": date.getDate(),                    //日   
    //         "h+": date.getHours(),                   //小时   
    //         "m+": date.getMinutes(),                 //分   
    //         "s+": date.getSeconds(),                 //秒   
    //         "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    //         "S": date.getMilliseconds()             //毫秒   
    //     };
    //     if (/(y+)/.test(fmt))
    //         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    //     for (var k in o)
    //         if (new RegExp("(" + k + ")").test(fmt))
    //             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //     return fmt;
    // }

    static dateAdd(dd, n) {
        var strs = new Array();
        strs = dd.split("-");
        var y = strs[0];
        var m = strs[1];
        var d = strs[2];
        var t = new Date(y, m - 1, d);
        var str = t.getTime() + n * (1000 * 60 * 60 * 24);
        var newdate = new Date();
        newdate.setTime(str);
        var strYear = newdate.getFullYear();
        var strDay = newdate.getDate();
        if (strDay < 10) {
            strDay = "0" + strDay;
        }
        var strMonth = newdate.getMonth() + 1;
        if (strMonth < 10) {
            strMonth = "0" + strMonth;
        }
        var strdate = strYear + "-" + strMonth + "-" + strDay;
        return strdate;
    }

}
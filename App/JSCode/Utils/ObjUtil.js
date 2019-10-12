module.exports = {
    objIsEmpty: function (obj) {
        if (obj && obj !== null) {
            return false;
        } else {
            return true;
        }
    },
    strIsEmpty: function (str) {
        if (str && str !== null && str !== '') {
            return false;
        } else {
            return true;
        }
    }
}
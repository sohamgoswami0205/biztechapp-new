export const checkZero = (value) => {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}

export const formatDate = (recDate) => {
    recDate = new Date(recDate);
    let date = checkZero(recDate.getDate()) + "/" + checkZero(recDate.getMonth() + 1) + "/" + recDate.getFullYear();
    let time = '';
    let hours = recDate.getHours();
    let period = 'AM';
    if (recDate.getHours() > 12) {
        hours -= 12;
        period = 'PM';
    }
    time = checkZero(hours) + ":" + checkZero(recDate.getMinutes()) + ":" + checkZero(recDate.getSeconds()) + " " + period;
    return date + " " + time;
}
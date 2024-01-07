function getOrdinal(n: number) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const convertDatetimeBlocktime = function (datetime: number) {
    const date = new Date(datetime * 1000);

    const formatted_date_time =
        date.toLocaleString("en-US", { weekday: "long" }) +
        ", " +
        getOrdinal(date.getDate()) +
        " " +
        date.toLocaleString("en-US", { month: "long" }) +
        " " +
        date.getFullYear() +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2) +
        ":" +
        ("0" + date.getSeconds()).slice(-2);

    return formatted_date_time;
};

export default convertDatetimeBlocktime;

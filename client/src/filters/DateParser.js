export default function (date) {
    if (date) {
        return new Date(date).toDateString();
    }
}

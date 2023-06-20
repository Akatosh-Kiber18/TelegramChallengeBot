export default (event, callback) => {
    if (event) {
        callback(event.target.value);
    } else {
        callback("");
    }
}
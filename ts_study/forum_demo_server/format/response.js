function FormatResponse(success, msg, content) {
    return {
        success: success,
        msg: success ? "ok" : msg,
        content: content
    }
}
module.exports = {
    FormatResponse
}
// File: TokenScanner.js
//
function TokenScanner(str) {
    let cp = 0;
    let ignoreWhitespaceFlag = false;
    return { nextToken, hasMoreTokens, ignoreWhitespace };

    //
    function nextToken() {
        if (ignoreWhitespaceFlag) skipWhitespace();
        if (cp === str.length) return "";
        let token = str.charAt(cp++);
        if (isLetterOrDigit(token)) {
            while (cp < str.length && isLetterOrDigit(str.charAt(cp))) {
                token += str.charAt(cp++);
            }
        }
        return token;
    }

    function hasMoreTokens() {
        if (ignoreWhitespaceFlag) skipWhitespace();
        return cp < str.length;
    }

    function ignoreWhitespace() {
        ignoreWhitespaceFlag = true;
    }

    function skipWhitespace() {
        while (cp < str.length && isWhitespace(str.charAt(cp))) {
            cp++;
        }
    }
}
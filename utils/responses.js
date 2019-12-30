class Response {

    //let status_code,message,result,is_success;

    constructor(isSuccess, statusCodes, message, result) {

        this.status_code = statusCodes;
        this.message = message;
        this.result = result;
        this.is_success = isSuccess;
    }

    getIsSuccess() {

        return this.is_success;
    }

    getMessage() {

        return this.message;
    }

    getStatusCode() {

        return this.status_code;
    }

    getResult() {
        return this.result;
    }

    setResult(result) {
        return this.result = result;
    }
}

module.exports = Response;
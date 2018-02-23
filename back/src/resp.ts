export default class Response {
    static generate(data, message: string, error) {
        if (error) {
            if (error instanceof String) {

            }
            if (error instanceof Error) {
                error = error.message;
            }
        }
        else if (data instanceof Array && data.length == 0) {
            error = "No data found";
        }

        return {
            data: error ? [] : data,
            message: message,
            error: error ? error : null
        };
    }
}
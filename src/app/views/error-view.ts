/**
 * Renders an Error.
 *
 * Renders an error to either text/html or application/json depending on the
 * Accept header of the request.
 *
 * @param {Object}  error   The error to render.
 */
const ErrorView = function (error: any) {
    const date = new Date();

    return {
        error: true,
        object: {
            message: error.message,
        },
        message: error.message,
        extendedMessage: error.extendedMessage,
        timeStamp: date.toISOString(),
        status: error.status
    }
}

export default ErrorView;

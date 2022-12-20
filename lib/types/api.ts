// Every possible Status Name
export type statusNames = 'Ok' | 'Failed' | 'Informational' | 'Redirected' | 'Unknown' | 'Bad Request' | 'Internal Server Error';

// Every possible Server Error Codes
export type statusServerErrCodes = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

// Every possible Informational Codes
export type statusInformationalCodes = 100 | 101 | 102 | 103;

// Every possible Success Codes
export type statusSuccessCodes = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;

// Every possible Redirect Codes
export type statusRedirectCodes = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;

// Every possible RequestErr Codes
export type statusRequestErrCodes = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451;

// Every possible statusCodes
export type statusCodes = statusServerErrCodes | statusInformationalCodes | statusSuccessCodes | statusRequestErrCodes | statusRedirectCodes;

// Actuall API Response to client
export type apiResponseMessage = {
    statusName: statusNames,
    statusCode: statusCodes,
    isError: boolean,
    msg: object
};

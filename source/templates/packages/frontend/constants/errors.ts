import { StatusCodes } from 'http-status-codes';

export const errorDefaultMessage = "Something went wrong. Please try again later.";

export const ErrorCodes5xx = [
    StatusCodes.INTERNAL_SERVER_ERROR,
    StatusCodes.NOT_IMPLEMENTED,
    StatusCodes.BAD_GATEWAY,
    StatusCodes.SERVICE_UNAVAILABLE,
    StatusCodes.GATEWAY_TIMEOUT,
    StatusCodes.HTTP_VERSION_NOT_SUPPORTED
 ]


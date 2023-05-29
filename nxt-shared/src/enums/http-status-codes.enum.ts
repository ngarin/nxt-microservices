export enum EHttpStatusCodes {
  // Success
  ok = 200,
  created = 201,
  noContent = 204,
  // Client error
  badRequest = 400,
  unauthorized = 401,
  paymentRequired = 402,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  conflict = 409,
  unprocessableEntity = 422,
  locked = 423,
  // Server Error
  internalServerError = 500
}

/**
 * @api {delete} /redis/local/all Delete All
 * @apiName DELETEId
 * @apiGroup Local Redis
 *
 *
 * @apiSuccess {String} success Delete all data from local Redis.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     success!
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
/**
 * @api {post} /redis/local/ Join User
 * @apiName JOIN USER
 * @apiGroup Local Redis
 *
 * @apiSuccess {String} id id of the User.
 * @apiSuccess {String} password password of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     success!
 *
 * @apiError BadRequest No id or Password in queryString.
 * @apiError LoginFailed id or password do not match.
 *
 * @apiErrorExample BadRequest
 *     HTTP/1.1 404 Not Found
 *     Invalid id or password
 * 
 * @apiErrorExample LoginFailed
 *     HTTP/1.1 409
 *     Error occur!
 */
/**
 * @api {delete} /redis/server/all Delete All
 * @apiName DELETEId
 * @apiGroup Server Redis
 *
 * @apiSuccess {String} success Delete all data from server Redis.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     success!
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
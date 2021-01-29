class Response {
  /**
   * @description - successResponse
   * @param {object} res
   * @param {object} data
   * @returns {object} Success
   */

  static successResponse(res, status, data) {
    return res.status(status).json(data);
  }

  /**
   * @description - bad request
   * @param {object} res
   * @param {object} data
   * @returns {object} Error
   */
  static errorHelper(res, data) {
   return  res.status(400).json(data);
  }
}

module.exports = Response;

// src/utils/helper.js
module.exports = {
  success: (res, message, data = {}) => {
    return res.json({ success: true, message, data });
  },
  error: (res, message, code = 400) => {
    return res.status(code).json({ success: false, message });
  },
};

exports.CONNECTION_SUCCESS = (id, historyData) => {
  return {
    Code: 200,
    Message: "Connection Succeed",
    userId: id,
    historyData: historyData,
  };
};

exports.SEND_DATA = (data) => {
  return {
    Code: 201,
    Message: "Success sending data",
    ...data,
  };
};

exports.NOT_FOUND = { Code: 404, Message: "Not found" };

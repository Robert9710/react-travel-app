// import fs from "fs";

export function init() {
  // return new Promise((resolve, reject) => {
  //   fs.readFile(`./server/data/Topics.json`, (err, data) => {
  //     const topics = JSON.parse(data);
  //     resolve([topics]);
  //   });
  // });
}

export function paginateResults(reqObj) {
  if (Array.isArray(reqObj.results)) {
    if (reqObj.pagesize && reqObj.pagesize !== "undefined") {
      if (!reqObj.pagenum || reqObj.pagenum === "undefined") {
        reqObj.pagenum = 1;
      }
      return reqObj.results.slice(
        (reqObj.pagenum - 1) * reqObj.pagesize,
        reqObj.pagenum * reqObj.pagesize,
      );
    } else {
      return reqObj.results;
    }
  }
}

export function requestHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

export function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      errorCode: err.errorCode,
    },
  });
}

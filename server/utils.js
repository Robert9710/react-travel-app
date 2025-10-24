import fs from "fs";

export function init() {
  return new Promise((resolve, reject) => {
    fs.readFile(`./server/data/Topics.json`, (err, data) => {
      const topics = JSON.parse(data);
      resolve([topics]);
    });
  });
}

export function paginateResults(reqObj) {
  if (Array.isArray(reqObj.results)) {
    if (reqObj.pagesize) {
      if (!reqObj.pagenum || reqObj.pagenum === "undefined") {
        reqObj.pagenum = 1;
      }
      return reqObj.results.slice(
        (reqObj.pagenum - 1) * reqObj.pagesize,
        reqObj.pagenum * reqObj.pagesize
      );
    } else {
      return reqObj.results;
    }
  }
}

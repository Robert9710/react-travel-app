import fs from "fs";

export function init() {
  return new Promise((resolve, reject) => {
    fs.readFile(`./server/data/Topics.json`, (err, data) => {
      const topics = JSON.parse(data);
      resolve([topics]);
    });
  });
}

import csv from "csv-parser";
import fs from "fs";
import { Question, isQuestion } from "./types";
import { CSV_DIRNAME } from "../../contants";

export default async (req, res) => {
  try {
    const questions = await getQuestions(CSV_DIRNAME);
    res.statusCode = 200;
    return res.json(questions);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ message: `[GET QUESTIONS] ${err}` });
  }
};

function getQuestions (csvDirname: string): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(csvDirname, (err, files) => {
      if (err) {
        throw new Error(`[Parse CSV]: ${err}`);
      }
      const results: Question[] = [];
      files.forEach((file) => {
        const csvPath = `${csvDirname}/${file}`;
        console.log('csvpath', csvPath);
        fs.createReadStream(csvPath)
          .pipe(csv({ separator: "|" }))
          .on("data", (data) => {
            if (isQuestion(data)) results.push(data);
            else console.error("[Read CSV] Row is not a question.", data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (err) => {
            console.error('[GET QUESTIONS]')
            reject(err);
          })
      });
    });
  });
};

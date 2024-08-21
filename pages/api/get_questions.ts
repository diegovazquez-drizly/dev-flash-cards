import csv from "csv-parser";
import fs from "fs";
import { Question, isQuestion } from "../../types/question";
import { CSV_DIRNAME } from "../../contants";
import { TagInfo } from "../../types/tagInfo";

export default async (req, res) => {
  try {
    const questions = (await getQuestions(CSV_DIRNAME)).map((q) => {
      q.show = true;
      return q;
    });
    const tags: Record<string, TagInfo> = {};
    questions.forEach((q) => {
      const currentTags = [q.tag_1, q.tag_2, q.tag_3];
      currentTags.forEach((t) => {
        t = t.toLowerCase();
        if (t in tags) {
          tags[t].count += 1;
        } else {
          tags[t] = { count: 1 };
        }
      });
    });

    res.statusCode = 200;
    return res.json({ questions, tags });
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return res.json({ message: `[GET QUESTIONS] ${err}` });
  }
};

function getQuestions(csvDirname: string): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(csvDirname, (err, files) => {
      if (err) {
        throw new Error(`[Parse CSV]: ${err}`);
      }
      const results: Question[] = [];
      files.forEach((file) => {
        const csvPath = `${csvDirname}/${file}`;
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
            console.error("[GET QUESTIONS]");
            reject(err);
          });
      });
    });
  });
}

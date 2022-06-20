import db from "./model";

export default async (req, res) => {
  let response;
  const { category, question, answer, hint, source, code } = JSON.parse(
    req.body
  );

  const query = `
    INSERT INTO card (card_question, card_answer, card_hint, card_source, card_code, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  try {
    response = await db.query(query, [
      question,
      answer,
      hint,
      source,
      code,
      category,
    ]);
    res.statusCode = 200;
    return res.json({ message: "OK" });
  } catch (err) {
    res.statusCode = 500;
    return res.json({ err });
  }
};

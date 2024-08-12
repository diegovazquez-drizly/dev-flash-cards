import db from "./model";

export default async (req, res) => {
  let response;
  const { category } = req.query;
  const query = `
    SELECT * 
    FROM card
    INNER JOIN category
    ON card.category_id = category.category_id 
    WHERE category_name = $1   
  `;
  try {
    response = await db.query(query, [category]);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return res.json({ message: "DB Error" });
  }
  res.statusCode = 200;
  return res.json(response.rows);
};

/*

  INSERT INTO card (card_question, card_answer, card_hint, card_source, card_code, category_id)
  VALUES (value1, value2, value3, ...);

*/

import db from "./model";

export default async (req, res) => {
  let cardResponse;
  let categoryResponse;
  const cardsQuery = `
    SELECT * FROM card
    INNER JOIN category
    ON card.category_id = category.category_id
  `;
  const categoryQuery = `
    SELECT * FROM category
  `;
  try {
    cardResponse = await db.query(cardsQuery);
    categoryResponse = await db.query(categoryQuery);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return res.json({ message: "DB Error" });
  }
  res.statusCode = 200;
  return res.json({
    cards: cardResponse.rows,
    categories: categoryResponse.rows,
  });
};

/*

  INSERT INTO card (card_question, card_answer, card_hint, card_source, card_code, category_id)
  VALUES (value1, value2, value3, ...);

*/

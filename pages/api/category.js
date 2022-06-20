import db from "./model";

export default async (req, res) => {
  const query = `
    SELECT * 
    FROM category   
  `;
  let response;
  try {
    response = await db.query(query);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ message: "DB Error" });
  }
  res.statusCode = 200;
  return res.json(response.rows);
};

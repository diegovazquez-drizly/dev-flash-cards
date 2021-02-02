// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from './model';

export default (req, res) => {
  const { category } = req.query;
  const query = `
    SELECT * 
    FROM card
    INNER JOIN category
    ON card.category_id = category.category_id 
    WHERE category_name = $1   
  `;
  db.query(query, [category])
    .then(response => {
      res.statusCode = 200;
      return res.json(response.rows);
    })
    .catch(err => {
      console.log('ERR start session-->', err);
      res.statusCode = 500;
      return res.json({message: 'DB Error'});
    })
}

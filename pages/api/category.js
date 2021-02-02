import db from './model';

export default (req, res) => {
  const query = `
    SELECT * 
    FROM category   
  `;
  db.query(query)
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

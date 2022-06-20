// import bcrypt from 'bcryptjs';
// import db from "./model";

// export default async (req, res) => {
//   let response;
//   const {username, password} = JSON.parse(req.body);

//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);

//    const query = `
//     INSERT INTO users (username, password)
//     VALUES ($1, $2)
//   `;

//   try {
//     response = await db.query(query, [username, hash]);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//     res.statusCode = 500;
//     return res.json({ message: "DB Error" });
//   }
// };

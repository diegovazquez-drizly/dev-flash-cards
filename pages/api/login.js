import bcrypt from "bcryptjs";
import db from "./model";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  let response;
  const { username, password } = JSON.parse(req.body);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const query = `
    SELECT password 
    FROM users
    WHERE username = $1   
  `;

  try {
    response = await db.query(query, [username]);

    const { rows } = response;

    if (rows.length) {
      const passwordHash = rows[0]?.password;
      const result = await bcrypt.compare(password, passwordHash);
      if (result) {
        const authToken = uuidv4();
        res.statusCode = 200;
        return res.json({ authToken });
      }
    } else {
      res.statusCode = 401;
      return res.json({ message: "User / password not found" });
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return res.json({ message: "DB Error" });
  }
};

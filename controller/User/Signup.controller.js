import { DatabaseConnection } from "../../DB/DBConnection.js";
import bcrypt from "bcrypt";
// User Signup Controller
const User_Signup = async (req, res) => {
  try {
    const { password, email, full_name } = req.body;
    if (!(password && email && full_name)) {
      return res.status(400).json({
        status: "error",
        response: null,
        error: "All fields are required",
      });
    }
    const userExist = await emailAlreadyExist(email);
    if (userExist) {
      return res.status(409).json({
        status: "Error",
        response: null,
        error: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO Users (password, email, full_name) VALUES (?, ?, ?)`;
    const response = await DatabaseConnection.run(query, [
      hashedPassword,
      email,
      full_name,
    ]);

    return res.status(200).json({
      status: "Success",
      response: {
        user: {
          fullName: full_name,
          email: email,
        },
      },
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      response: null,
      error: err.message,
    });
  }
};
const emailAlreadyExist = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT email FROM Users WHERE email = ?`;
    DatabaseConnection.all(query, [email], (err, rows) => {
      if (err) {
        return reject(new Error("Something went wrong"));
      }
      if (rows.length > 0) {
        return resolve(true); // Email already exists
      }
      return resolve(false); // Email does not exist
    });
  });
};

export { User_Signup };

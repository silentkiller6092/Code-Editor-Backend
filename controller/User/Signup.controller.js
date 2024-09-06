import { DatabaseConnection } from "../../DB/DBConnection.js";
import bcrypt from "bcrypt";
// User Signup Controller
const User_Signup = async (req, res) => {
  try {
    const { username, password, email, full_name, phone } = req.body;
    if (!(username && password && email && full_name && phone)) {
      return res.status(400).json({
        status: "error",
        response: null,
        error: "All fields are required",
      });
    }
    const userExist = await emailAlreadyExist(email);
    if (userExist) {
      return res.status(409).json({
        status: "Conflict",
        response: null,
        error: "User Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO Users (username, password, email, phone, full_name) VALUES (?, ?, ?, ?, ?)`;
    const response = await DatabaseConnection.run(query, [
      username,
      hashedPassword,
      email,
      phone,
      full_name,
    ]);

    return res.status(201).json({
      status: "Success",
      response: "User Created Successfully",
      error: null,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
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

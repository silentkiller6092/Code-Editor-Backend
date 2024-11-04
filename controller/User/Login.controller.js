import jsonwebtoken from "jsonwebtoken";
import { DatabaseConnection } from "../../DB/DBConnection.js";
import bcrypt from "bcrypt";
const User_Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password))
      return res.status(404).json({
        status: "Error",
        response: null,
        error: "All Fields are requried",
      });
    const userDetail = await findUser(email, password);
    if (userDetail) {
      const accessToken = await createAccessToekn(userDetail);

      const refreshToken = await createRefreshToekn(userDetail);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        maxAge: 40 * 1000,
      }); // 15 minutes
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }); // 7 days
      const store_RefreshToekn = `update Users set refresh_token=? where email =?`;
      DatabaseConnection.run(
        store_RefreshToekn,
        [refreshToken, email],
        (err, rows) => {
          if (err) {
            return res.status(401).json({
              status: "Error",
              response: null,
              error: "Unable to generate Token",
            });
          } else {
            return res.status(200).json({
              status: "Success",
              response: {
                user: {
                  fullName: userDetail.full_name,
                  email: userDetail.email,
                },
              },
            });
          }
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      response: null,
      error: err.message,
    });
  }
};
const createAccessToekn = async (user) => {
  return jsonwebtoken.sign(
    { id: user.id, email: user.email, full_name: user.full_name },
    process.env.ACCESS_TOEKN_SECERATE,
    { expiresIn: "30s" }
  );
};

const createRefreshToekn = async (user) => {
  return jsonwebtoken.sign(
    { id: user.id, email: user.email, full_name: user.full_name },
    process.env.REFRESH_TOEKN_SECERATE,
    {
      expiresIn: "7d",
    }
  );
};
const findUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    const query = `select * from Users where email =?`;
    DatabaseConnection.all(query, [email], async (err, rows) => {
      if (err) return reject(new Error("Something went wrong"));
      if (rows.length > 0) {
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          resolve(user); // Password is correct, return user details
        } else {
          reject(new Error("Email or Password Incorrect")); // Incorrect password
        }
      } else {
        reject(new Error("Email or Password Incorrect")); // No user found with this email
      }
    });
  });
};
export { User_Login };

import { response } from "express";
import { DatabaseConnection } from "../../DB/DBConnection.js";
const All_Templates = async (req, res) => {
  try {
    const query = `SELECT t.id AS template_id,t.name AS template_name,t.flavor as template_flavour,c.name AS category_name FROM templates t JOIN categories c ON t.category_id = c.id`;
    const template_details = await new Promise((resolve, reject) => {
      DatabaseConnection.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (!template_details) {
      return res.status(401).json({
        status: "Error",
        response: null,
        error: "Something went wrong while generating template",
      });
    } else {
      return res.status(200).json({
        status: "Success",
        response: template_details,
        error: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      response: null,
      error: err.message,
    });
  }
};
export { All_Templates };

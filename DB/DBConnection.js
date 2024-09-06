import sqlite3 from "sqlite3";
const sql3 = sqlite3.verbose();

const ConnectDB = async (err) => {
  if (err) {
    console.log(err);
    return {
      status: "error",
      message: err.message,
      statusCode: 500,
    };
  } else {
    return {
      status: "success",
      message: "Database connection established successfully.",
      statusCode: 200,
    };
  }
};

const DatabaseConnection = new sql3.Database(
  "Database/mydatabase.db",
  sqlite3.OPEN_READWRITE,
  ConnectDB
);
export { DatabaseConnection };

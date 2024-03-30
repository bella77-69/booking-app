import * as  dbConn from "../config/db.config.js";

export const getUserByEmailIdAndPassword = async (
  uname,
  password
) => {
  let user = db.getUserByUsername(uname);
  if (user) {
    if (user.password === password) {
      return user;
    } else {
      return null;
    }
  }
};

export const getUserById = async (id) => {
  let user = dbConn.getUser(id);
  if (user) {
    return user;
  }
  return null;
};

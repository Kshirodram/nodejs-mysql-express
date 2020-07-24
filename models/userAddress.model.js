import sql from "./db.js";

class Address {
  constructor(address) {
    this.userId = parseInt(address.userId);
    this.houseNo = address.houseNo;
    this.lane1 = address.lane1;
    this.lane2 = address.lane2;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
    this.postalCode = address.postalCode;
    this.active = address.active;
  }

  static create = (newAddress, result) => {
    console.log(newAddress);
    sql.query("INSERT INTO user_addresses SET ?", newAddress, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created user address: ", {
        id: res.insertId,
        ...newAddress,
      });
      result(null, { id: res.insertId, ...newAddress });
    });
  };

  static getAll = (userId, result) => {
    sql.query(
      `SELECT * FROM user_addresses WHERE userId = ${userId}`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log("addresses: ", res);
        result(null, res);
      }
    );
  };
}

export default Address;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});


function cekValidOTP(nomor, callback) {
    const sql = 'select RIGHT(TextDecoded, 6) as otp from sentitems '
        + 'where DestinationNumber = ? '
        + 'and UpdatedInDB IN (SELECT max(UpdatedInDB) FROM sentitems)';
    return connection.query(sql, [nomor], function (err, result) {
        if (err) throw err;
        // console.log(result);
        return callback(result);
    });
}

module.exports = cekValidOTP;

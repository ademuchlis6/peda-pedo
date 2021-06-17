const oracledb = require("oracledb");
const dbConfigApp = require("../config/db_orcl_confApp.js");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function InsertUser(nik, noHp, password) {
    try {
        connection = await oracledb.getConnection(dbConfigApp);
        //15 karakter bcrypt untuk password
        const salt = bcrypt.genSaltSync(15);
        const passwordHash = bcrypt.hashSync(password, salt);

        const resulSql = await connection.execute(
            `INSERT INTO USER_CLIENT VALUES (:id, :noHp, :nik, :password)`,
            [uuidv4(), '' + noHp + '', '' + nik + '', '' + passwordHash + ''],
            { autoCommit: true }
        );

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                // Connections should always be released when not needed
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = InsertUser;
const oracledb = require("oracledb");
const dbConfigApp = require("../config/db_orcl_confApp.js");

async function CekUser(noHp) {
    try {
        connection = await oracledb.getConnection(dbConfigApp);

        const resulSql = await connection.execute(
            `SELECT COUNT(NO_HP) jml FROM USER_CLIENT where NO_HP = :nik`,
            ['' + noHp + ''],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        const jml = resulSql.rows[0].JML
        return jml;

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


module.exports = CekUser;
const oracledb = require("oracledb");
const dbConfig = require("../config/db_orcl_conf.js");

async function CekNIk(nik) {
    try {
        connection = await oracledb.getConnection(dbConfig);

        const resulSql = await connection.execute(
            `SELECT COUNT(NIK) jml FROM BIODATA_WNI where NIK = :nik`,
            ['' + nik + ''],
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


module.exports = CekNIk;
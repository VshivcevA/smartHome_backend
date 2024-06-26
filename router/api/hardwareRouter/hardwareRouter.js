const express = require('express')
const hardwareRouter = express.Router()
const sql = require("../../../conf/postgresConf");

hardwareRouter.use((req, res, next)=>{
    next()
})

hardwareRouter.get('/nanoble33battery', async (req, res) => {
    //todo пока только для батареи
    const table = "nanoble33battery"
    const data = await sql`
        select ${sql`
            TO_CHAR
            (timestamp, 'HH24:MI') AS time,
            voltage
            `}
        from ${sql(table)}
        where
            timestamp >= current_timestamp - interval '1' day
    `
    res.json(data);
})


module.exports = hardwareRouter
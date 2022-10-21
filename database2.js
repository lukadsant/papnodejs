
const sql2 = require('mssql/msnodesqlv8')

const conn2 = new sql2.ConnectionPool({
    database: 'FPS_Database',
    server:'tcp:192.168.45.55,1433',
    driver: "msnodesqlv8",
    user: 'lukadsant',
    password: '!@adminFPS',

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
})



conn2.connect().then((result) =>{
    if (result.connecting){
        console.log('con...')
    }
    if (result.connected){
      
        var id = '2020202013'

        result.request().query(`select * from SEC0013_ALUNOS_MATRICULADOS_GERAL WHERE MATRÍCULA = '${id}'`,(err,result)=>{
            if (err){
                console.log('hata',err)

            }
            console.log('result2222222',result)
        })
        console.log('conected')
    }

})

let date = new Date()
console.log('haiiiiiiusufi',date.toLocaleString())

module.exports = conn2;
const mysql = require('mysql')

const pools = {}
const query = (sql, callback, host = '127.0.0.1') => {
  if (!(host in pools)) {
    pools[host] = mysql.createPool({
      host: host,
      port: '3306',
      user: 'root',
      password: ''
    })
  }
  pools[host].getConnection((err, connection) => {
    if (!err) {
      connection.query(sql, (err, results) => {
        callback(err, results)
        connection.release()
      })
    } else {
      callback(err, null)
    }
  })
}

module.exports = query

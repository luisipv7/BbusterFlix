require('dotenv').config()
module.exports = {
  dialect: 'mysql',
  host: process.env.NODE_ENV === 'dockerDev' ? process.env.HDOCKER : process.env.HOST,
  username: process.env.USER,
  password: process.env.NODE_ENV === 'dockerDev' ? process.env.PASSWORD : process.env.PASSWORD_LOCAL,
  database: process.env.DATABASE,
  define: {
    timestamps: true
  },
}

require('dotenv').config()
module.exports = {
  dialect: 'mysql',
  host: process.env.NODE_ENV === 'dockerDev' ? process.env.HDOCKER : process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true
  },
}

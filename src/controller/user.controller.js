const Models = require('../models/index')
const jwt = require('jsonwebtoken')
const { v5: uuid } = require("uuid")
const MY_NAMESPACE = '55238d15-c926-4598-b49d-cf4e913ba13c'


module.exports = {
  async create (req, res) {
    if (!req.body.email) {
      res.status(400).send({
        message: 'Email não pode estar vazio!'
      })
      return
    }

    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: uuid(req.body.password, MY_NAMESPACE)
      }

      await Models.User.create(user)
      return res.status(200).json(user)

    } catch (error) {
      return res.status(500).send({ error: error.message })
    }

  },

  async login (req, res) {
    try {
      const email = req.body.email
      const dataValues = await Models.User.findOne({ raw: true, where: { email } })
      const pass = uuid(req.body.password, MY_NAMESPACE)
      const confirmPass = dataValues.password.localeCompare(pass)
      if (confirmPass !== 0) {
        res.status(400).send({
          message: 'Usuário não encontrado!'
        })
      }
      let token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET, { expiresIn: 84600 });
      // window.localStorage.setItem('ACCESS_TOKEN', token)
      res.json(token);
    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  },

  async logout (req, res) {
    // window.localStorage.removeItem('ACCESS_TOKEN')

    return res.status(200).json('Logoff efetuado com sucesso!')
  }
}

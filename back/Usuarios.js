const db = require('./db')
class Usuarios extends db {
  constructor(obj) {
    super()
    this.id = obj.id
    this.nome = obj.nome
    this.email = obj.email
    this.senha = obj.senha
    this.perfil = obj.perfil
    this.assinante = obj.assinante
    this.dtt_upd = obj.dtt_upd
    this.who = obj.who
  }

  static get(args, callback) {
    super.get(this.constructor.name, args, callback)
  }

  static destroy(id, callback) {
    super.destroy(this.constructor.name, id, callback)
  }
}
module.exports = Usuarios
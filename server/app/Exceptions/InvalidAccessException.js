'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidAccessException extends LogicalException {
  handle (error, { response }) {
    return response.status(401).json({
      error: 'Acceso invalido a recurso',
    })
  }
}

module.exports = InvalidAccessException

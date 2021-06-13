'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Property extends Model {
    user() {
        return this.belongsTo('App/Models/User') // 1-1
    }

    images() {
        return this.hasMany('App/Models/Image') // 1-N
    }
}

module.exports = Property

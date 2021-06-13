'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Env = use('Env')
const Model = use('Model')

class Image extends Model {
    static get computed() {
        return ['url'] // url para front-end
    }

    getUrl({ path }) {
        return `${Env.get('APP_URL')}/images/${path}`
    }
}

module.exports = Image

const _ = require('lodash')
const i18nAnswer = require('./answers/i18n')
const regularAnswer = require('./answers/regular')

const answers = {
  i18n: i18nAnswer,
  regular: regularAnswer
}

module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setGenerator('resource', {
    description: 'Create a resource',
    prompts: [
      {
        type: 'list',
        choices: ['regular', 'i18n'],
        name: 'type',
        message: 'What is your resource type?'
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your resource name (in plural and lowercase)?'
      }
    ],
    actions: ({ type }) => answers[type]
  })

  plop.setHelper(
    'slice',
    (
      /**@type String */
      name
    ) => {
      const transform = _.kebabCase(name)

      return transform.includes('-') ? formatSlice(transform) : name.slice(0, -1)
    }
  )
}

const formatSlice = (
  /**@type {string} */
  transform
) => {
  const split = transform.split('-')
  const index = split.findIndex((s) => s.charAt(s.length - 1) === 's')
  const preffix = index === 0 ? split[0].slice(0, -1) : split[0]
  const suffix = index === 1 ? split[1].slice(0, -1) : split[1]

  return `${preffix}-${suffix}`
}

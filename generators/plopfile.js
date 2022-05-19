const _ = require('lodash')
const { singular } = require('pluralize')
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
        message: 'What is the resource type?'
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the resource name (in plural and lowercase)?'
      },
      {
        type: 'input',
        name: 'field',
        message: 'What is the field name that should be translated?',
        when: (answers) => answers.type === 'i18n'
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

      return transform.includes('-') ? formatSlice(transform) : singular(name)
    }
  )
}

const formatSlice = (
  /**@type {string} */
  transform
) => {
  const split = transform.split('-')
  const splits = split.map((s) => (s.charAt(s.length - 1) === 's' ? singular(s) : s))

  return splits.join('-')
}

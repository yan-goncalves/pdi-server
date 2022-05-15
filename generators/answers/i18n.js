/** @type {import('plop').AddActionConfig} */
module.exports = [
  // ---------------------------------------- REGULAR ----------------------------------------
  // DTO
  // DTO/CREATE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/dto/create-{{kebabCase (slice name)}}.input.ts',
    templateFile: './templates/i18n/name/dto/create.input.ts.hbs'
  },
  // DTO/UPDATE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/dto/update-{{kebabCase (slice name)}}.input.ts',
    templateFile: './templates/i18n/name/dto/update.input.ts.hbs'
  },
  // ENTITY
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/entities/{{kebabCase (slice name)}}.entity.ts',
    templateFile: './templates/i18n/name/entities/name.entity.ts.hbs'
  },
  // MOCK
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/mock/index.ts',
    templateFile: './templates/i18n/name/mock/index.ts.hbs'
  },
  // SERVICE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.service.ts',
    templateFile: './templates/i18n/name/name.service.ts.hbs'
  },
  // RESOLVER
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.resolver.ts',
    templateFile: './templates/i18n/name/name.resolver.ts.hbs'
  },
  // MODULE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.module.ts',
    templateFile: './templates/i18n/name/name.module.ts.hbs'
  },

  // ---------------------------------------- I18N ----------------------------------------
  // DTO
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}-i18n/dto/{{kebabCase (slice name)}}-i18n.input.ts',
    templateFile: './templates/i18n/name-i18n/dto/name-i18n.input.ts.hbs'
  },
  // ENTITY
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}-i18n/entities/{{kebabCase (slice name)}}-18n.entity.ts',
    templateFile: './templates/i18n/name-i18n/entities/name-i18n.entity.ts.hbs'
  },
  // MOCK
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}-i18n/mock/index.ts',
    templateFile: './templates/i18n/name-i18n/mock/index.ts.hbs'
  },
  // SERVICE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}-i18n/{{kebabCase name}}-i18n.service.ts',
    templateFile: './templates/i18n/name-i18n/name-i18n.service.ts.hbs'
  },
  // MODULE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}-i18n/{{kebabCase name}}-i18n.module.ts',
    templateFile: './templates/i18n/name-i18n/name-i18n.module.ts.hbs'
  }
]

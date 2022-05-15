/** @type {import('plop').AddActionConfig} */
module.exports = [
  // DTO
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/dto/create-{{kebabCase (slice name)}}.input.ts',
    templateFile: './templates/regular/dto/create.input.ts.hbs'
  },
  // ENTITY
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/entities/{{kebabCase (slice name)}}.entity.ts',
    templateFile: './templates/regular/entities/name.entity.ts.hbs'
  },
  // MOCK
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/mock/index.ts',
    templateFile: './templates/regular/mock/index.ts.hbs'
  },
  // SERVICE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.service.ts',
    templateFile: './templates/regular/name.service.ts.hbs'
  },
  // RESOLVER
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.resolver.ts',
    templateFile: './templates/regular/name.resolver.ts.hbs'
  },
  // MODULE
  {
    type: 'add',
    path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.module.ts',
    templateFile: './templates/regular/name.module.ts.hbs'
  }
]

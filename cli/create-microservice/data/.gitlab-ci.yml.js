const fileContent = `include:
  - local: {{serviceName}}/ci/.build-ci.yml
  - local: {{serviceName}}/ci/.prepare_dockerfile-ci.yml
  - local: {{serviceName}}/ci/.zip-ci.yml
  #  - local: {{serviceName}}/ci/.tests-ci.yml
  - local: {{serviceName}}/ci/.deploy-ci.yml
`

module.exports = { fileContent }

const fs = require('fs')
const { resolve } = require('path')

const { getFirstCharUpper } = require('../helpers/get-first-char-upper')

const gitlabCIPath = resolve(__dirname, '../../../.gitlab-ci.yml')
const dockerComposePath = resolve(__dirname, '../../../docker-compose.yml')
const currentPortPath = resolve(__dirname, '../data/current-port.txt')
const makefilePath = resolve(__dirname, '../../../Makefile')
const apiNginxConfPath = resolve(__dirname, '../../../server/conf.d/dev-api.winningbrothers.localhost.conf')

const gitlabCIContent = fs.readFileSync(gitlabCIPath, 'utf8')
const dockerComposeContent = fs.readFileSync(dockerComposePath, 'utf8')
const currentPort = parseInt(fs.readFileSync(currentPortPath, 'utf8'))
const makefileContent = fs.readFileSync(makefilePath, 'utf8')
const apiNginxConfContent = fs.readFileSync(apiNginxConfPath, 'utf8')

const editConfigFilesSrc = (prefix, name) => {
  const gitlabCIIncludeContentToReplace = `- local: ${prefix}-${name}/.gitlab-ci.yml
  ### CLI INCLUDE SPOT (don't touch)
`

  let nextPort = currentPort + 1

  fs.writeFileSync(currentPortPath, nextPort)

  const dockerComposeContentToReplace = `# ${name
    .split('-')
    .map((part, index) => (index === 0 ? getFirstCharUpper(part) : part))
    .join(' ')} service
  ${prefix}-${name}:
    depends_on:
      - mongo-db
    image: ${prefix}-${name}
    container_name: ${prefix}-${name}
    restart: unless-stopped
    build:
      context: ./${prefix}-${name}
      dockerfile: Dockerfile.dev
    volumes:
      - ./${prefix}-${name}:/usr/src/${prefix}-${name}:cached
      - ./nxt-shared:/usr/src/nxt-shared:cached
      - ./nxt-backend:/usr/src/nxt-backend:cached
    ports:
      - '${nextPort}:${nextPort}'
    networks:
      - app-network
  ### SERVICES SPOT (don't touch)
`

  const makefileInstallContentToReplace = `docker run --rm -v \${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared ${prefix}-${name} npm ci
\tdocker run --rm -v \${CURDIR}/nxt-backend:/usr/src/nxt-backend -w /usr/src/nxt-backend ${prefix}-${name} npm ci
\tdocker run --rm -v \${CURDIR}/${prefix}-${name}:/usr/src/${prefix}-${name} -w /usr/src/${prefix}-${name} ${prefix}-${name} npm ci

\t# Install by CLI (don\'t touch)`

  const makefileRemoveContentToReplace = `rm -rf ${prefix}-${name}/node_modules
\t# Remove dependencies by CLI (don\'t touch)`

  const makefileLinkContentToReplace = `docker run --rm -v \${CURDIR}/nxt-shared:/usr/src/nxt-shared -w /usr/src/nxt-shared ${prefix}-${name} npm link
\tdocker run --rm -v \${CURDIR}/nxt-shared:/usr/src/nxt-shared -v \${CURDIR}/nxt-backend:/usr/src/nxt-backend -w /usr/src/nxt-backend ${prefix}-${name} sh -c "npm link && npm link ../nxt-shared"
\tdocker run --rm -v \${CURDIR}/nxt-shared:/usr/src/nxt-shared -v \${CURDIR}/nxt-backend:/usr/src/nxt-backend -v \${CURDIR}/${prefix}-${name}:/usr/src/${prefix}-${name} -w /usr/src/${prefix}-${name} ${prefix}-${name} npm link ../nxt-shared ../nxt-backend


\t# Link by CLI (don\'t touch)`

  fs.writeFileSync(
    gitlabCIPath,
    gitlabCIContent.replace("### CLI INCLUDE SPOT (don't touch)", gitlabCIIncludeContentToReplace)
  )

  fs.writeFileSync(
    dockerComposePath,
    dockerComposeContent.replace("### SERVICES SPOT (don't touch)", dockerComposeContentToReplace)
  )

  fs.writeFileSync(
    makefilePath,
    makefileContent
      .replace("# Install by CLI (don't touch)", makefileInstallContentToReplace)
      .replace("# Remove dependencies by CLI (don't touch)", makefileRemoveContentToReplace)
      .replace("# Link by CLI (don't touch)", makefileLinkContentToReplace)
  )

  const apiNginxConfContentToReplace = `location /${name}/ {
    proxy_pass http://${prefix}-${name}:${nextPort}/;
  }

  # Server (don't touch)`

  fs.writeFileSync(
    apiNginxConfPath,
    apiNginxConfContent.replace("# Server (don't touch)", apiNginxConfContentToReplace)
  )
}

module.exports = { editConfigFilesSrc }

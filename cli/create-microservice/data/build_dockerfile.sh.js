const fileContent = `#!/bin/sh

sed -i -e 's@{{MONGO_PROTOCOL}}@'"$MONGO_PROTOCOL"'@' ./Dockerfile
sed -i -e 's@{{MONGO_HOST}}@'"$MONGO_HOST"'@' ./Dockerfile
sed -i -e 's@{{MONGO_USER}}@'"$MONGO_USER"'@' ./Dockerfile
sed -i -e 's@{{MONGO_DB}}@'"$MONGO_DB"'@' ./Dockerfile
sed -i -e 's@{{MONGO_PWD}}@'"$MONGO_PWD"'@' ./Dockerfile
sed -i -e 's@{{MONGO_AUTH_SOURCE}}@'"$MONGO_AUTH_SOURCE"'@' ./Dockerfile
`

module.exports = { fileContent }

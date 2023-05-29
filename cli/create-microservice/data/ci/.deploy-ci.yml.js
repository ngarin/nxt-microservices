const fileContent = `Deploy {{serviceName}} to staging:
  image: ubuntu:20.04
  only:
    refs:
      - develop
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  dependencies:
    - Generate {{serviceName}} zip for staging
  stage: deploy
  before_script:
    - cd {{serviceName}}
    - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
    - eval $(ssh-agent -s)
    - ssh-add <(echo "\${STAGING_SSH_PRIVATE_KEY}")
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - echo "$STAGING_SSH_KNOWN_HOSTS" > ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
  script:
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "rm -rf /home/\${STAGING_SERVER_USER}/{{serviceName}}"
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "mkdir /home/\${STAGING_SERVER_USER}/{{serviceName}}"
    - scp build.zip \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST}:/home/\${STAGING_SERVER_USER}/{{serviceName}}
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "unzip /home/\${STAGING_SERVER_USER}/{{serviceName}}/build.zip -d /home/\${STAGING_SERVER_USER}/{{serviceName}}"
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "docker container rm --force {{serviceName}} || true"
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "docker build /home/\${STAGING_SERVER_USER}/{{serviceName}} -t {{serviceName}}"
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "docker run --restart=on-failure -p {{port}}:{{port}} -d --name {{serviceName}} {{serviceName}}"
    - ssh \${STAGING_SERVER_USER}@\${STAGING_SERVER_HOST} "rm -rf /home/\${STAGING_SERVER_USER}/{{serviceName}}"
`

module.exports = { fileContent }

const fileContent = `Prepare {{serviceName}} dockerfile for staging:
  image: ubuntu:20.04
  only:
    refs:
      - develop
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  dependencies:
    - Build {{serviceName}} for staging
  stage: dockerfile
  variables:
    MONGO_PROTOCOL: \${STAGING_MONGO_PROTOCOL}
    MONGO_HOST: \${STAGING_MONGO_HOST}
    MONGO_USER: \${STAGING_MONGO_USER}
    MONGO_DB: \${STAGING_MONGO_DB}
    MONGO_PWD: \${STAGING_MONGO_PWD}
    MONGO_AUTH_SOURCE: \${STAGING_MONGO_AUTH_SOURCE}
  before_script:
    - cd {{serviceName}}
  script:
    - chmod +x ./build_dockerfile.sh
    - ./build_dockerfile.sh
  artifacts:
    paths:
      - {{serviceName}}/Dockerfile
    expire_in: 12 hours

Prepare {{serviceName}} dockerfile for preprod:
  image: ubuntu:20.04
  only:
    refs:
      - master
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  dependencies:
    - Build {{serviceName}} for preprod
  stage: dockerfile
  variables:
    MONGO_PROTOCOL: \${PREPROD_MONGO_PROTOCOL}
    MONGO_HOST: \${PREPROD_MONGO_HOST}
    MONGO_USER: \${PREPROD_MONGO_USER}
    MONGO_DB: \${PREPROD_MONGO_DB}
    MONGO_PWD: \${PREPROD_MONGO_PWD}
    MONGO_AUTH_SOURCE: \${PREPROD_MONGO_AUTH_SOURCE}
  before_script:
    - cd {{serviceName}}
  script:
    - chmod +x ./build_dockerfile.sh
    - ./build_dockerfile.sh
  artifacts:
    paths:
      - {{serviceName}}/Dockerfile
    expire_in: 12 hours

Prepare {{serviceName}} dockerfile for production:
  image: ubuntu:20.04
  only:
    refs:
      - tags
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  dependencies:
    - Build {{serviceName}} for production
  stage: dockerfile
  variables:
    MONGO_PROTOCOL: \${PROD_MONGO_PROTOCOL}
    MONGO_HOST: \${PROD_MONGO_HOST}
    MONGO_USER: \${PROD_MONGO_USER}
    MONGO_DB: \${PROD_MONGO_DB}
    MONGO_PWD: \${PROD_MONGO_PWD}
    MONGO_AUTH_SOURCE: \${PROD_MONGO_AUTH_SOURCE}
  before_script:
    - cd {{serviceName}}
  script:
    - chmod +x ./build_dockerfile.sh
    - ./build_dockerfile.sh
  artifacts:
    paths:
      - {{serviceName}}/Dockerfile
    expire_in: 12 hours
`

module.exports = { fileContent }

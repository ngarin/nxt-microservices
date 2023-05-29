const fileContent = `# Zip generation
Generate {{serviceName}} zip for staging:
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
    - Prepare {{serviceName}} dockerfile for staging
  stage: zip
  before_script:
    - apt-get update
    - apt-get install -y zip unzip
  script:
    - mkdir -p tmp/{{serviceName}}
    - mkdir -p tmp/nxt-backend
    - mkdir -p tmp/nxt-shared
    - cp {{serviceName}}/Dockerfile tmp/
    - cp {{serviceName}}/package.json tmp/{{serviceName}}/
    - cp {{serviceName}}/package-lock.json tmp/{{serviceName}}/
    - cp -R {{serviceName}}/dist/ tmp/{{serviceName}}/dist/
    - cp nxt-backend/package.json tmp/nxt-backend/
    - cp nxt-backend/package-lock.json tmp/nxt-backend/
    - cp -R nxt-backend/dist/ tmp/nxt-backend/dist/
    - cp -R nxt-shared/dist/ tmp/nxt-shared/dist/
    - cp nxt-shared/package.json tmp/nxt-shared/
    - cp nxt-shared/package-lock.json tmp/nxt-shared/
    - cd tmp
    - zip -r build.zip Dockerfile {{serviceName}}/ nxt-backend/ nxt-shared/
    - mv build.zip ../{{serviceName}}/build.zip
  artifacts:
    paths:
      - {{serviceName}}/build.zip
    expire_in: 2 weeks

Generate {{serviceName}} zip for preprod:
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
    - Prepare {{serviceName}} dockerfile for preprod
  stage: zip
  before_script:
    - apt-get update
    - apt-get install -y zip unzip
  script:
    - mkdir -p tmp/{{serviceName}}
    - mkdir -p tmp/nxt-backend
    - mkdir -p tmp/nxt-shared
    - cp {{serviceName}}/Dockerfile tmp/
    - cp {{serviceName}}/package.json tmp/{{serviceName}}/
    - cp {{serviceName}}/package-lock.json tmp/{{serviceName}}/
    - cp -R {{serviceName}}/dist/ tmp/{{serviceName}}/dist/
    - cp nxt-backend/package.json tmp/nxt-backend/
    - cp nxt-backend/package-lock.json tmp/nxt-backend/
    - cp -R nxt-backend/dist/ tmp/nxt-backend/dist/
    - cp -R nxt-shared/dist/ tmp/nxt-shared/dist/
    - cp nxt-shared/package.json tmp/nxt-shared/
    - cp nxt-shared/package-lock.json tmp/nxt-shared/
    - cd tmp
    - zip -r build.zip Dockerfile {{serviceName}}/ nxt-backend/ nxt-shared/
    - mv build.zip ../{{serviceName}}/build.zip
  artifacts:
    paths:
      - {{serviceName}}/build.zip
    expire_in: 2 weeks

Generate {{serviceName}} zip for production:
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
    - Prepare {{serviceName}} dockerfile for production
  stage: zip
  before_script:
    - apt-get update
    - apt-get install -y zip unzip
  script:
    - mkdir -p tmp/{{serviceName}}
    - mkdir -p tmp/nxt-backend
    - mkdir -p tmp/nxt-shared
    - cp {{serviceName}}/Dockerfile tmp/
    - cp {{serviceName}}/package.json tmp/{{serviceName}}/
    - cp {{serviceName}}/package-lock.json tmp/{{serviceName}}/
    - cp -R {{serviceName}}/dist/ tmp/{{serviceName}}/dist/
    - cp nxt-backend/package.json tmp/nxt-backend/
    - cp nxt-backend/package-lock.json tmp/nxt-backend/
    - cp -R nxt-backend/dist/ tmp/nxt-backend/dist/
    - cp -R nxt-shared/dist/ tmp/nxt-shared/dist/
    - cp nxt-shared/package.json tmp/nxt-shared/
    - cp nxt-shared/package-lock.json tmp/nxt-shared/
    - cd tmp
    - zip -r build.zip Dockerfile {{serviceName}}/ nxt-backend/ nxt-shared/
    - mv build.zip ../{{serviceName}}/build.zip
  artifacts:
    paths:
      - {{serviceName}}/build.zip
    expire_in: 2 weeks
`

module.exports = { fileContent }

const fileContent = `# Build
Build {{serviceName}} for staging:
  image: node:12.15.0-alpine
  only:
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  stage: build
  except:
    - tags
    - master
  before_script:
    - cd nxt-shared
    - npm ci
    - npm link
    - npm run build
    - cd ../nxt-backend
    - cp src/config/app.config.stag.ts src/config/app.config.ts
    - rm src/config/app.config.preprod.ts
    - rm src/config/app.config.prod.ts
    - npm ci
    - npm link
    - npm link nxt-shared
    - npm run build
    - cd ../{{serviceName}}
    - npm ci
    - npm link nxt-backend
    - npm link nxt-shared
  script:
    - npm run build
  artifacts:
    paths:
      - nxt-backend/dist/
      - nxt-shared/dist/
      - {{serviceName}}/dist/
    expire_in: 12 hours

Build {{serviceName}} for preprod:
  image: node:12.15.0-alpine
  only:
    refs:
      - master
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  stage: build
  before_script:
    - cd nxt-shared
    - npm ci
    - npm link
    - npm run build
    - cd ../nxt-backend
    - cp src/config/app.config.preprod.ts src/config/app.config.ts
    - rm src/config/app.config.stag.ts
    - rm src/config/app.config.prod.ts
    - npm ci
    - npm link
    - npm link nxt-shared
    - npm run build
    - cd ../{{serviceName}}
    - npm ci
    - npm link nxt-backend
    - npm link nxt-shared
  script:
    - npm run build
  artifacts:
    paths:
      - nxt-backend/dist/
      - nxt-shared/dist/
      - {{serviceName}}/dist/
    expire_in: 12 hours

Build {{serviceName}} for production:
  image: node:12.15.0-alpine
  only:
    refs:
      - tags
    changes:
      - {{serviceName}}/**/*
      - nxt-backend/**/*
      - nxt-shared/**/*
  stage: build
  before_script:
    - cd nxt-shared
    - npm ci
    - npm link
    - npm run build
    - cd ../nxt-backend
    - cp src/config/app.config.prod.ts src/config/app.config.ts
    - rm src/config/app.config.stag.ts
    - rm src/config/app.config.preprod.ts
    - npm ci
    - npm link
    - npm link nxt-shared
    - npm run build
    - cd ../{{serviceName}}
    - npm ci
    - npm link nxt-backend
    - npm link nxt-shared
  script:
    - npm run build
  artifacts:
    paths:
      - nxt-backend/dist/
      - nxt-shared/dist/
      - {{serviceName}}/dist/
    expire_in: 12 hours
`

module.exports = { fileContent }

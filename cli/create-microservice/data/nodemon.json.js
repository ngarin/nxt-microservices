const fileContent = `{
  "watch": ["src/**/*.ts", "../nxt-backend/src/**/*.ts", "../nxt-shared/src/**/*.ts"],
  "exec": "npm run build && npm run serve",
  "execMap": {
    "ts": "node"
  },
  "ext": "ts"
}`

module.exports = { fileContent }

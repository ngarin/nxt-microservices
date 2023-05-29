const fileContent = `{
  "version": "3.8.3",
  "compilerOptions": {
    "outDir": "./dist",
    "lib": ["es5", "es6", "dom", "es2019"],
    "sourceMap": true,
    "declaration": false,
    "esModuleInterop": true,
    "module": "commonjs",
    "target": "es6",
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@service/*": ["service/*"]
    }
  },
  "exclude": ["**/*.test.ts"]
}`

module.exports = { fileContent }

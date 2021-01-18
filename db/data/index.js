const ENV = process.env.NODE_ENV || 'development'

const test = require("./test-data")


const data = {
  test: test 
}

module.exports = data[ENV]
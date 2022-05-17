try {
    const { user, pass, database } = require('./local')

    module.exports = {
        mongodbUrl: `mongodb+srv://${user}:${pass}@cluster0.3dgs8.mongodb.net/${database}`
    }
} catch (e) {
    const err = new Error("Require error, refer to hint. /config/local.js.txt")
    console.log(err)
}
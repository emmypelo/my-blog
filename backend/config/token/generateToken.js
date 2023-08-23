const jwt = require ('jsonwebtoken')
const mykeys = process.env.JWT_SECRET

const generateToken = id => {
    return jwt.sign({ id }, mykeys, { expiresIn: '244h' })
}
module.exports = generateToken
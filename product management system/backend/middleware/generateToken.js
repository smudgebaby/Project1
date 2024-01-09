import jwt from 'jsonwebtoken';

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email
    }

    const secretKey = 'SECRET_KEY';

    const options = {
        expiredIn: '2h'
    }

    const token = jwt.sign(payload, secretKey, options)

    return token
}

export default generateToken;
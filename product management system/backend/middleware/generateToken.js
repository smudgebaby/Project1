import jwt from 'jsonwebtoken';

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const options = {
        expiresIn: '2h'
    }

    const token = jwt.sign(payload, secretKey, options)

    return token
}

export default generateToken;
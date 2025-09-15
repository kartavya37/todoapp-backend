import jwt from 'jsonwebtoken'

const genToken = (id) => {
    try {
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" })
        return token;
    } catch (error) {
        throw new Error("Token generation failed");
    }
}

export default genToken;
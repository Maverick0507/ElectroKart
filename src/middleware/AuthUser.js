import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
const AuthUser = async (req) => {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')
    if (!access_token) return false

    try {
        if (!access_token) {
            return false
        }

        const extractUser = jwt.verify(access_token.value, process.env.JWT_SECRET)
        if (extractUser) return extractUser
    } catch (error) {
        console.log(error)
        return false
    }
}

export default AuthUser
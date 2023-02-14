import * as jose from 'jose'

const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)
const alg = 'HS256'
const issuer = 'japodhidev@gmail.com'

/**
 * Generate a JWT
 * @param  {String} audience Token audeince
 * @return {Promise}         A string representing the JWT token, once the promise resolves
 */
const generateJWT = async (audience = '') => {
    return await new jose.SignJWT({'urn:example:claim': true})
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime('2h')
        .sign(secret)
}

/**
 * Validate JWT
 * @param  {String} token    A valid JWT token
 * @param  {String} audience The JWT's target audience
 * @return {[type]}          Return an object containing the decoded contents of the JWT
 */
const verifyJWT = async (token= '', audience = '') => {
    const { payload, protectedHeader } = await jose.jwtVerify(token, secret, {
        issuer: issuer,
        audience: audience,
    })

    return { payload, protectedHeader }
}

export { generateJWT, verifyJWT }
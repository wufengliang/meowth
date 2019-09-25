export default {
    key: 'SessionId',
    maxAge: 3600000 * 24,
    overwrite: true,
    httpOnly: true,
    signed: true,
}
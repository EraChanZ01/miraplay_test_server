module.exports = (err, req, res, next) => {
    console.log(err.code, err.message)
    const statusCode = err.code || 500;
    const errorMessage = err.message || 'Internal Server Error';
    res.status(statusCode).send(errorMessage)
}
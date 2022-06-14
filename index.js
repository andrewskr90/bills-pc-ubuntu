const server = require('./service')

const PORT = process.env.PORT || 7070


server.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`)
})

const {google} = require('googleapis');
const playintegrity = google.playintegrity('v1');

const packageName = "com.example.myapplication_123"
const privatekey = ""

async function getTokenResponse(token) {
    let jwtClient = new google.auth.JWT(
        "clive-93@bright-calculus-413309.iam.gserviceaccount.com",
        null,
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRzGEqZB3lW2WR\n3Vcrn4Hvua5ESollrxtFyRSgFfnwk4fIuLzFnRwYiJ5SjciRf8ef4Qrvmay23Zrc\nG6EoANUiYrlnw3Hsd82zRmkF7D5edeSuBeqJydJkmXcNEYe7xRb7RsrerXWZ54WC\nPAmcNrTL3EDXBTD6CnKeqY71IB8zrXcLXD8GiFfERVlLWTpHO4h6nJEUxrec4ebA\nCzqP/uhQA2axaMSoK4vsdi2tY7QcCsQcYHsiPZ272PJaaotwuL1grIZA+AWanINL\nkhWmTVgleWjHQhyCUdch82xIJGyVBzt3r41nmAdzsu7qIvE0IeLpz8LdK4hN5dK5\nc9jqJgOHAgMBAAECggEAU9FKlIwRIZvlNWRvuh7s46CUTfZVdEmEJNpUIi0FgSb/\n3aJo0K6XFfom/qZkljStxWM8YkNMLHbWss9bEEdc33L/zcPY1Pd8N/6OYO5kcIq7\nRQdaD5iRNN3XIWJ6jvsL1nIPBO3aCRXlUgW4dS+qBbRGN2F8krjv2BG36pjdvl/6\nyousjfKo5Ogd7KtxXF7AvzIykX4U7kZ6RSZeT0g0LVw85XdOhL5CdOBI+VJBpECJ\ncZ/SxSX5EXw779U+lorkfYC6r2FTAjqHjuuByuCgnnc0HSjc9KEDiqYyrJFfZuNE\nV/axogilERd/n6o5tbwcuiItrZzf0h13TiR0h0ISGQKBgQDyrbIVsgclNeDVdQiN\nP/529acoMssyKT3DromVD/PFoDsrqN+Vze2Z72TbRqYeMM122SiVyslEPxR/uvF3\n59tyDgnTlNhas1gKkP8b/gKKFLVLO//lKynZgLCekQF3X762ZKiR741WK0Zku3n5\n7eh0bo9PD+dCQU++ylRPt67wuwKBgQDdUKCAHg/3uvAlk3HAmDS8rBGKmRiLyzF2\nioipgKUJOxDnLQ/gMX9BhB1g+TFrB9EeWW4J9UDhKbm6R8c7cqLGzAJeCeXmN5LA\nQ+Lq482A5t82Z3lM8YzpJlLBzJFpp1bSYaf/2hEOe6lWiWosFQRJh86J14wLeSam\ntxx1k6phpQKBgEMX4J9869rOzY1WYPnkUm8DNaa4fFMu8cOTEriig2wFA7brZn1d\nRK6FcCXrn2vDZFrSaRUYzpJOulUiEzZqZNJgrTjQ8wwIf3PUaKONk5gnZ4QYX4Q1\nbcmTecEtJ/GgB/MXWz+Vska7iie5aVy++MCP/JEIPZCky+5cs/iiOPyXAoGAR75E\nWWPlbzxFbxjuDi4JIoRxJ0nb4C1den0MMk6GsYhZQWelNts00os+bto5P+YHz1vU\nRRwhDRzWnWF5X3cY93LY7Z0tzsSDKRqYq+ZvDvNItr0yYFQJhucqerKTDPn3Njn8\nGP+a+ePykB/5sBKcEi4ZMSwTtQBwHClN63uUBxUCgYBO8yn1JvVZHQIPmy6NNn/f\nfnM7Jr4t8S812el3K4h/joFNJ3oXaRZGHTdb75VAUUdO2wakxA8aDEgQ0PnMo2Ei\nq3m4nLmVRDb3hRxpB1WdsjUXOa0NPASBTPmXP6LDlNVi0DAqCwwPLQHlrJB9FOa2\nHJweMqO4056rS7imq7oEXg==\n-----END PRIVATE KEY-----\n",
        ['https://www.googleapis.com/auth/playintegrity']);

    google.options({ auth: jwtClient });

    const res = await playintegrity.v1.decodeIntegrityToken(
        {
            packageName: packageName,
            requestBody:{
                "integrityToken": token
            }
        }
    );

    console.log(res.data.tokenPayloadExternal);
    return res.data.tokenPayloadExternal
}

module.exports = async (req, res) => {
    const { token = 'none' } = req.query

    if (token == 'none') {
        res.status(400).send({ 'error': 'No token provided' })
        return
    }

    getTokenResponse(token)
        .then(data => {
            res.status(200).send(data)
            return
        })
        .catch(e => {
            console.log(e)
            res.status(200).send({ 'error': 'Google API error.\n' + e.message })
            return
        });
}

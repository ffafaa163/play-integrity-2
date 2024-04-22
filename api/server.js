const {google} = require('googleapis');
const playintegrity = google.playintegrity('v1');


const packageName = "com.example.myapplication_123"
const privatekey = ""


// const express = require('express');
// const app = express();
// const fd = require('formidable');
// const fs = require("fs");
// const bp = require('body-parser');
// app.use(bp.urlencoded({
   
	// extended: false
// }));
// const cors = require('cors');
// app.use(cors());
// app.all('*', function(mes, res, next) {
   
	// res.setHeader('Access-Control-Allow-Origin',
		// 'http://localhost:63342')
	// next();
// })
// app.use(express.static('./'));

// app.listen(2000, function() {
   
	// console.log('服务器开启监听，2000...')
// })

async function getTokenResponse(token) {
	
	console.log("token-------",token);

    let jwtClient = new google.auth.JWT(
        "clive-93@bright-calculus-413309.iam.gserviceaccount.com",
        null,
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRzGEqZB3lW2WR\n3Vcrn4Hvua5ESollrxtFyRSgFfnwk4fIuLzFnRwYiJ5SjciRf8ef4Qrvmay23Zrc\nG6EoANUiYrlnw3Hsd82zRmkF7D5edeSuBeqJydJkmXcNEYe7xRb7RsrerXWZ54WC\nPAmcNrTL3EDXBTD6CnKeqY71IB8zrXcLXD8GiFfERVlLWTpHO4h6nJEUxrec4ebA\nCzqP/uhQA2axaMSoK4vsdi2tY7QcCsQcYHsiPZ272PJaaotwuL1grIZA+AWanINL\nkhWmTVgleWjHQhyCUdch82xIJGyVBzt3r41nmAdzsu7qIvE0IeLpz8LdK4hN5dK5\nc9jqJgOHAgMBAAECggEAU9FKlIwRIZvlNWRvuh7s46CUTfZVdEmEJNpUIi0FgSb/\n3aJo0K6XFfom/qZkljStxWM8YkNMLHbWss9bEEdc33L/zcPY1Pd8N/6OYO5kcIq7\nRQdaD5iRNN3XIWJ6jvsL1nIPBO3aCRXlUgW4dS+qBbRGN2F8krjv2BG36pjdvl/6\nyousjfKo5Ogd7KtxXF7AvzIykX4U7kZ6RSZeT0g0LVw85XdOhL5CdOBI+VJBpECJ\ncZ/SxSX5EXw779U+lorkfYC6r2FTAjqHjuuByuCgnnc0HSjc9KEDiqYyrJFfZuNE\nV/axogilERd/n6o5tbwcuiItrZzf0h13TiR0h0ISGQKBgQDyrbIVsgclNeDVdQiN\nP/529acoMssyKT3DromVD/PFoDsrqN+Vze2Z72TbRqYeMM122SiVyslEPxR/uvF3\n59tyDgnTlNhas1gKkP8b/gKKFLVLO//lKynZgLCekQF3X762ZKiR741WK0Zku3n5\n7eh0bo9PD+dCQU++ylRPt67wuwKBgQDdUKCAHg/3uvAlk3HAmDS8rBGKmRiLyzF2\nioipgKUJOxDnLQ/gMX9BhB1g+TFrB9EeWW4J9UDhKbm6R8c7cqLGzAJeCeXmN5LA\nQ+Lq482A5t82Z3lM8YzpJlLBzJFpp1bSYaf/2hEOe6lWiWosFQRJh86J14wLeSam\ntxx1k6phpQKBgEMX4J9869rOzY1WYPnkUm8DNaa4fFMu8cOTEriig2wFA7brZn1d\nRK6FcCXrn2vDZFrSaRUYzpJOulUiEzZqZNJgrTjQ8wwIf3PUaKONk5gnZ4QYX4Q1\nbcmTecEtJ/GgB/MXWz+Vska7iie5aVy++MCP/JEIPZCky+5cs/iiOPyXAoGAR75E\nWWPlbzxFbxjuDi4JIoRxJ0nb4C1den0MMk6GsYhZQWelNts00os+bto5P+YHz1vU\nRRwhDRzWnWF5X3cY93LY7Z0tzsSDKRqYq+ZvDvNItr0yYFQJhucqerKTDPn3Njn8\nGP+a+ePykB/5sBKcEi4ZMSwTtQBwHClN63uUBxUCgYBO8yn1JvVZHQIPmy6NNn/f\nfnM7Jr4t8S812el3K4h/joFNJ3oXaRZGHTdb75VAUUdO2wakxA8aDEgQ0PnMo2Ei\nq3m4nLmVRDb3hRxpB1WdsjUXOa0NPASBTPmXP6LDlNVi0DAqCwwPLQHlrJB9FOa2\nHJweMqO4056rS7imq7oEXg==\n-----END PRIVATE KEY-----\n",
        ['https://www.googleapis.com/auth/playintegrity']);
	console.log("jwt-----",jwtClient);
    google.options({ auth: jwtClient });

    const resp = await playintegrity.v1.decodeIntegrityToken(
        {
            packageName: packageName,
            requestBody:{
                "integrityToken": token
            }
        }
    );


    console.log(resp.data.tokenPayloadExternal);

    return resp.data.tokenPayloadExternal
}

const http = require('http')
const server = http.createServer((req, res, ) => {
    // req即request，res即response
    
    console.log('ok'); // 每次请求都会执行一次回调函数中的语句
    
    // 浏览器输入的 url 为 http://localhost:2000/check?token= 《token》
    const path = req.url.split('?')[0]
    const queryStr = req.url.split('?')[1]
    const method = req.method
    console.log(method, path, queryStr);

    const urlParams = new URLSearchParams(queryStr)
    console.log(urlParams); // URLSearchParams { 'username' => 'sense', 'sex' => 'male' }

    if (path === '/server' && method === 'GET') {
        if (urlParams.get('token')) {
			const token = urlParams.get('token')
			
			if (token == 'none') {
				res.status(400).send({ 'error': 'No token provided' })
				return
			}
			
			getTokenResponse(token)
				.then(data => {
					res.status(200).send(data)
					return
				})
				.catch(res, e => {
					console.log(e)
					res.status(200).send({ 'error': 'Google API error.\n' + e.message })
					return
				});
			// res.end(token)
			// getTokenResponse(token)
				// .then(data => {
					// console.log(data)
					// res.end(data)
					// return
				// })
				// .catch(e => {
					// console.log(e)
					// res.end({ 'error': 'Google API error.\n' + e.message })
					// return
				// });
			
            return 
        }
        return
    }
    res.end('404')
	
    // 每次触发请求回调函数中只能调用一次response.end()，否则会报错
})
server.listen(2000) // 监听2000端口

console.log('check port 2000'); // 打印则表示服务器启动成功

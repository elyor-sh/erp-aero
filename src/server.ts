import 'dotenv/config'
import {PORT, SWAGGER_BASE_URL} from "./config/vars";
import {app} from "./app";

const bootstrap = async () => {
    try {
         app.listen(PORT, () => {
             console.log(`Server has been started in port ${PORT}`)
             console.log(`Api Documentation ${SWAGGER_BASE_URL}/api/docs`)
         })
    }catch (e) {
        console.error('Server start error', e)
        process.exit(0)
    }
}

bootstrap()
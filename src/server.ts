import 'dotenv/config'
import {PORT} from "./config/vars";
import {app} from "./app";

const bootstrap = async () => {
    try {
         app.listen(PORT, () => console.log(`Server has been started in port ${PORT}`))
    }catch (e) {
        console.error('Server start error', e)
        process.exit(0)
    }
}

bootstrap()
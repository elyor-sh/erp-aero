import 'dotenv/config'
import {PORT} from "./config";
import {app} from "./app";

const bootstrap = async () => {
    try {
        await app.listen(PORT, () => console.log(`Server has been started in port ${PORT}`))
    }catch (e) {
        console.error('Server start error', e)
        process.exit(0)
    }
}

bootstrap()
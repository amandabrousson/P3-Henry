import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/dataSource";
import { preloadUserData, preloadTurnosData, preloadCredentialsData } from "./helpers/preloadData";


const initializeApp = async () => {
    await AppDataSource.initialize()
    await preloadCredentialsData();
    await preloadUserData();
    await preloadTurnosData();
    server.listen(PORT, () => {
        console.log(`server en puerto ${PORT}`);
    })
}

initializeApp()


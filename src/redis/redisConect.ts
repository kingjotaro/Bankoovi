import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

function createRedisClient() {
    const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

    if (!REDIS_PASSWORD) {
        throw new Error("Missing Redis password");
    }

    if (!REDIS_HOST) {
        throw new Error("Missing Redis host");
    }

    if (!REDIS_PORT) {
        throw new Error("Missing Redis port");
    }

    const client = createClient({
        password: REDIS_PASSWORD,
        socket: {
            host: REDIS_HOST,
            port: parseInt(REDIS_PORT, 10),
        },
    });

    client.on("error", (err) => {
        console.error(`Error on Redis connection: ${err}`);
    });

    client.on("connect", () => {
        console.log("Connected to Redis");
    });

    client.connect().catch(console.error);

    return client;
}

const redisClient = createRedisClient();
export default redisClient;

import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';
import { defineItemRoutes } from './infrastructure/server/routes/itemRoutes';
import { registerSwagger } from './infrastructure/server/plugins/swagger';

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    defineRoutes(server);
    defineItemRoutes(server);
    registerSwagger(server);

    return server;
};

export const initializeServer = async () => {
    const server = getServer();
    await server.initialize();
    return server;
};

export const startServer = async () => {
    const server = getServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};

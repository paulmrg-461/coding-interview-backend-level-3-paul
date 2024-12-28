import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Package from '../../../../package.json';

export const registerSwagger = async (server: Hapi.Server) => {
    const swaggerOptions: HapiSwagger.RegisterOptions = {
        info: {
            title: 'API de Items',
            version: Package.version,
        },
        documentationPath: '/docs',
        basePath: '/',
        grouping: 'tags',
        tags: [
            {
                name: 'items',
                description: 'Operaciones relacionadas con Items',
            },
        ],
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);
};

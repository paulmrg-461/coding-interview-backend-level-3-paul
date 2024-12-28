import { Server } from '@hapi/hapi';
import { ItemService } from '../../../application/services/itemService';
import { InMemoryItemRepository } from '../../database/inMemoryItemRepository';
import { createItemSchema } from '../../../interfaces/dto/createItemDto';
import { updateItemSchema } from '../../../interfaces/dto/updateItemDto';
import Joi from 'joi';

const itemRepository = new InMemoryItemRepository();
const itemService = new ItemService(itemRepository);

export const defineItemRoutes = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/items',
        options: {
            description: 'Obtener todos los Items',
            tags: ['api', 'items'],
            response: {
                schema: Joi.array().items(
                    Joi.object({
                        id: Joi.string().uuid().required(),
                        name: Joi.string().required(),
                        price: Joi.number().required(),
                    })
                ),
            },
        },
        handler: async (request, h) => {
            const items = await itemService.getAllItems();
            return h.response(items).code(200);
        },
    });

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params as { id: string };
            try {
                const item = await itemService.getItemById(id);
                return h.response(item).code(200);
            } catch (error) {
                if (error instanceof Error && error.name === 'NotFoundError') {
                return h.response({ message: error.message }).code(404);
                }
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        },
    });

    server.route({
        method: 'POST',
        path: '/items',
        options: {
            description: 'Crear un nuevo Item',
            tags: ['api', 'items'],
            validate: {
                payload: createItemSchema,
                failAction: (request, h, err) => {
                    throw err;
                },
            },
            response: {
                status: {
                    201: Joi.object({
                        id: Joi.string().uuid().required(),
                        name: Joi.string().required(),
                        price: Joi.number().required(),
                    }),
                },
            },
        },
        handler: async (request, h) => {
            const { name, price } = request.payload as { name: string; price: number };
            try {
                const newItem = await itemService.createItem(name, price);
                return h.response(newItem).code(201);
            } catch (error) {
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        },
    });

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        options: {
            validate: {
                payload: updateItemSchema,
                failAction: (request, h, err) => {
                throw err;
                },
            },
        },
        handler: async (request, h) => {
            const { id } = request.params as { id: string };
            const payload = request.payload as Partial<{ name: string; price: number }>;
            try {
                const updatedItem = await itemService.updateItem(id, payload);
                return h.response(updatedItem).code(200);
            } catch (error) {
                if (error instanceof Error && error.name === 'NotFoundError') {
                return h.response({ message: error.message }).code(404);
                }
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        },
    });

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params as { id: string };
            try {
                await itemService.deleteItem(id);
                return h.response().code(204);
            } catch (error) {
                if (error instanceof Error && error.name === 'NotFoundError') {
                return h.response({ message: error.message }).code(404);
                }
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        },
    });
};

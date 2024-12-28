import { ItemRepository } from '../../domain/repositories/itemRepository';
import { Item } from '../../domain/entities/item';
import { NotFoundError } from '../../domain/errors/notFoundError';

export class ItemService {
    constructor(private readonly itemRepository: ItemRepository) {}

    async getAllItems(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }

    async getItemById(id: string): Promise<Item> {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new NotFoundError(`Item with ID ${id} not found`);
        }
        return item;
    }

    async createItem(name: string, price: number): Promise<Item> {
        const newItem: Item = { id: '', name, price };
        return this.itemRepository.create(newItem);
    }

    async updateItem(id: string, data: Partial<Item>): Promise<Item> {
        const existingItem = await this.itemRepository.findById(id);
        if (!existingItem) {
            throw new NotFoundError(`Item with ID ${id} not found`);
        }
        return this.itemRepository.update(id, data);
    }

    async deleteItem(id: string): Promise<void> {
        const existingItem = await this.itemRepository.findById(id);
        if (!existingItem) {
            throw new NotFoundError(`Item with ID ${id} not found`);
        }
        await this.itemRepository.delete(id);
    }
}

import { ItemRepository } from '../../domain/repositories/itemRepository';
import { Item } from '../../domain/entities/item';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryItemRepository implements ItemRepository {
    private items: Item[] = [];

    async findAll(): Promise<Item[]> {
        return this.items;
    }

    async findById(id: string): Promise<Item | null> {
        const item = this.items.find(item => item.id === id);
        return item || null;
    }

    async create(item: Item): Promise<Item> {
        const newItem = { ...item, id: uuidv4() };
        this.items.push(newItem);
        return newItem;
    }

    async update(id: string, item: Partial<Item>): Promise<Item> {
        const index = this.items.findIndex(item => item.id === id);
    
        if (index === -1) {
            throw new Error('Item not found');
        }

        this.items[index] = { ...this.items[index], ...item };
        return this.items[index];
    }

    async delete(id: string): Promise<void> {
        this.items = this.items.filter(item => item.id !== id);
    }
}

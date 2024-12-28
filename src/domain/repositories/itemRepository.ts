import { Item } from '../entities/item';

export interface ItemRepository {
    findAll(): Promise<Item[]>;
    findById(id: string): Promise<Item | null>;
    create(item: Item): Promise<Item>;
    update(id: string, item: Partial<Item>): Promise<Item>;
    delete(id: string): Promise<void>;
}

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getItem(key: string): Promise<unknown> {
    return (await this.cacheManager.get(this.formatKey(key))) ?? null;
  }

  async setItem(key: string, value: Record<string, unknown>): Promise<void> {
    await this.cacheManager.set(this.formatKey(key), value, {
      ttl: 60 * 60 * 12,
    });
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  formatKey(key: string): string {
    return key.split(' ').join('-');
  }
}

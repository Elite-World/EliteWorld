class CacheService {
  private cache = new Map<string, { data: any, timestamp: number }>();
  private ttl: number;

  constructor(ttl: number = 5 * 60 * 1000) { // Default 5 minutes
    this.ttl = ttl;
    this.startCleanup();
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private startCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.cache.entries()) {
        if (now - entry.timestamp > this.ttl) {
          this.cache.delete(key);
        }
      }
    }, 60 * 1000); // Cleanup every minute
  }
}

export const cache = new CacheService(); 
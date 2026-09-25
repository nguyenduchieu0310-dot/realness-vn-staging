export function mountCarousel(element: HTMLElement, options?: { autoplay?: boolean; seconds?: number; interactive?: boolean }): () => void;
export function carouselColumns(value: unknown): 1 | 2;
export function carouselFrames<T>(images: T[], value: unknown): T[][];
export function carouselImageStyle(block: Record<string, unknown>, id: string): { objectFit: 'cover' | 'contain'; objectPosition: string };

export type ImageCrop = { x: number; y: number; w: number; h: number };
export function normalizedCrop(value: unknown): ImageCrop | null;
export function imagePresentation(block: Record<string, unknown>): Record<string, string>;
export function mountCropEditor(container: HTMLElement, source: string, initial: unknown, onChange: (value: ImageCrop) => void): { reset(): void };

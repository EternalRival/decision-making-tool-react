import { beforeEach, describe, expect, it, vi } from 'vitest';
import { rotationEmitter } from './rotation-emitter';

describe('rotationEmitter', () => {
  const mockState = { durationValue: 5, soundEnabled: true } as const;

  beforeEach(() => {
    rotationEmitter['events'].clear();
  });

  it('should call registered callbacks on emit', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    rotationEmitter.on(callback1);
    rotationEmitter.on(callback2);

    rotationEmitter.emit(mockState);

    expect(callback1).toHaveBeenCalledWith(mockState);
    expect(callback2).toHaveBeenCalledWith(mockState);
  });

  it('should not call unsubscribed callbacks', () => {
    const callback = vi.fn();

    rotationEmitter.on(callback);
    rotationEmitter.off(callback);

    rotationEmitter.emit(mockState);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle multiple subscriptions and unsubscriptions', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    rotationEmitter.on(callback1);
    rotationEmitter.on(callback2);

    rotationEmitter.off(callback1);

    rotationEmitter.emit(mockState);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledWith(mockState);
  });

  it('should not fail if emit is called without callbacks', () => {
    expect(() => {
      rotationEmitter.emit(mockState);
    }).not.toThrow();
  });

  it('should not fail if off is called for a non-existent callback', () => {
    const callback = vi.fn();

    expect(() => {
      rotationEmitter.off(callback);
    }).not.toThrow();
  });

  it('should handle multiple emits correctly', () => {
    const callback = vi.fn();

    rotationEmitter.on(callback);

    rotationEmitter.emit(mockState);
    rotationEmitter.emit(mockState);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(mockState);
  });
});

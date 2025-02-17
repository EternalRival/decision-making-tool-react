import type { DecisionPickerState } from './decision-picker-state.schema';

type Callback = (props: DecisionPickerState) => void;

class RotationEmitter {
  private events = new Set<Callback>();

  public emit(...args: Parameters<Callback>) {
    this.events.forEach((callback) => {
      callback(...args);
    });
  }

  public on(callback: Callback) {
    this.events.add(callback);
  }

  public off(callback: Callback) {
    this.events.delete(callback);
  }
}

export const rotationEmitter = new RotationEmitter();

import type { DecisionPickerState } from '../schemas/decision-picker-state.schema';

type Callback = (props: DecisionPickerState) => void;

class RotationEmitter {
  private events = new Set<Callback>();

  public emit(...args: Parameters<Callback>) {
    this.events.forEach((fn) => {
      fn(...args);
    });
  }

  public on(fn: Callback) {
    this.events.add(fn);
  }

  public off(fn: Callback) {
    this.events.delete(fn);
  }
}

export default new RotationEmitter();

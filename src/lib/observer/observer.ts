export class Observer {
  #listeners = new Set<() => void>();
  subscribe(listener: () => void) {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }
  emit() {
    for (const listener of this.#listeners) {
      queueMicrotask(() => {
        listener();
      });
    }
  }
}

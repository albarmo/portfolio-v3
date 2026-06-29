type EventArgs = unknown[];
type Listener<T extends EventArgs> = (...args: T) => void;

export class EventEmitter<EventMap extends Record<string, EventArgs>> {
    private eventListeners: {
        [K in keyof EventMap]?: Set<Listener<EventMap[K]>>;
    } = {};

    on<K extends keyof EventMap>(eventName: K, listener: Listener<EventMap[K]>) {
        const listeners = this.eventListeners[eventName] ?? new Set();
        listeners.add(listener);
        this.eventListeners[eventName] = listeners;
    }

    emit<K extends keyof EventMap>(eventName: K, ...args: EventMap[K]) {
        const listeners = this.eventListeners[eventName] ?? new Set();
        for (const listener of listeners) {
            listener(...args);
        }
    }

    remove<K extends keyof EventMap>(eventName: K) {
        if (!this.eventListeners[eventName]) return;
        delete this.eventListeners[eventName];
    }
}

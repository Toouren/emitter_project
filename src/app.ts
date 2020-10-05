type events = {
    log: (val: string) => void;
    sum: (args: { a: number; b: number }) => void;
};

export class TypedEventEmitter<T extends events> {
    private subscribers: { [K in keyof T]?: Array<T[K]> } = {};

    on = <K extends keyof T>(eventName: K, handler: T[K]) => {
		if (this.subscribers[eventName]) {
			(this.subscribers[eventName] as Array<T[K]>).push(handler);
		} else {
			this.subscribers[eventName] = [handler];
		}
    };

    emit = <K extends keyof T>(eventName: K, value: any ) => {
		this.subscribers[eventName]?.forEach((handler: any) => handler(value))
    };
}

const typedEventEmitter: TypedEventEmitter<events> = new TypedEventEmitter<events>();

typedEventEmitter.on('log', (x: string) => console.log(x));

typedEventEmitter.on('sum', (args: { a: number, b: number }) => args.a + args.b )

typedEventEmitter.emit('log', '4');
typedEventEmitter.emit('sum', {a: 4, b: 6});
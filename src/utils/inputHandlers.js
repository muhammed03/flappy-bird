class InputHandler {
    // configuration - what events and how to process
    eventHandlerMap = {};

    constructor(eventHandlerConfig) {
        this._eventHandlerConfig = eventHandlerConfig;
    }

    subscribe() {
        Object.entries(this.eventHandlerMap).forEach(([name, handler]) => {
            document.addEventListener(name, handler);
        });
    }
}

export default class MouseInputHandler extends InputHandler {
    buttonIndexNameMap = {
        0: "left",
        1: "middle",
        2: "right"
    };

    eventHandlerMap = {
        click: (event) => {
            const buttonName = this.buttonIndexNameMap[event.button]; // event.button = left
            const handler = this._eventHandlerConfig[buttonName];
            if (handler) {
                handler(event);
            }
        }
    };
}
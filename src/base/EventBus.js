import $ from "jquery";

//解耦EventBus
class EventBus {
    constructor() {
        this._eventBus = $(window);
    }

    on(eventName, fn) {
        return  this._eventBus.on(eventName, fn);
    }

    trigger(eventName, fn) {
       return  this._eventBus.trigger(eventName, fn);
    }

    off(eventName, fn) {
        return this._eventBus.off(eventName, fn);
    }
}

export default EventBus;
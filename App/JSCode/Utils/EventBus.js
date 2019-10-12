import EventEmitter from 'events';

class SkyEventBus extends EventEmitter {
    constructor() {
        super()
        this.setMaxListeners(0)
    }
}
const EventBus = new SkyEventBus();
export default EventBus;


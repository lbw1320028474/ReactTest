import EventEmitter from 'events';

class EventBean extends EventEmitter {

}
const SingleCountEmitter = new EventBean();
export default SingleCountEmitter;


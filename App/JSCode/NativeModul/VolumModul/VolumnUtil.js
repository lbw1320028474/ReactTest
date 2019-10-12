import {
    Platform
} from 'react-native';
import VolumnNativeModul from './VolumnNativeModul'
export default class VolumnUtil {
    static volumnListenerOn() {
        if(Platform.OS === 'ios'){
            return;
        }
        VolumnNativeModul.volumnListenerOn();
    }

    static volumnListenerOff() {
        if(Platform.OS === 'ios'){
            return;
        }
        VolumnNativeModul.volumnListenerOff();
    }
}
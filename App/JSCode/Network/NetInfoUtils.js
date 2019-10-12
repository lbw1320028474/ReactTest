import { Platform, PixelRatio, NetInfo } from 'react-native'
/**
 * @author bangwen.lei
 */
export default class NetInfoUtils {
    static isConnected = true;
    static addNetworkStateEvent = function () {
        NetInfo.isConnected.addEventListener(       //监听网络变化    
            'connectionChange',
            (isConnected) => {
                NetInfoUtils.isConnected = isConnected;
            }
        );
    }
    // static removeNetworkStateEvent = function () {
    //     NetInfo.isConnected.removeEventListener(       //监听网络变化    
    //         'connectionChange',
    //         (isConnected) => {
    //             NetInfoUtils.isConnected = isConnected;
    //         }
    //     );
    // }
}


import { Platform, PixelRatio } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import AppUtils from '../Utils/AppUtils'
import DeviceInfoStatic from '../NativeModul/MyDeviceInfo/DeviceInfoStatic'
/**
 * @author bangwen.lei
 */
export default class TerminalInfo {

	totalRamSize; //ram总空间

	availRamSize; //ram剩余空间

	totalRomSize;

	availRomSize;

	exTotalSdcardSize; //扩展sdcard总空间

	exAvailSdcardSize;	//扩张sdcard剩余空间

	totalSdcardSize;

	availSdcardSize;

	height = parseInt('0' + AppUtils.size.height / AppUtils.pixel);

	width = parseInt('0' + AppUtils.size.width / AppUtils.pixel);

	haman = DeviceInfo.getBrand();

	hstype = DeviceInfo.getModel();

	imsi = DeviceInfoStatic.imsi;

	imei = AppUtils.getImei();

	/**
	 * Android系统sdk版本
	 */
	sdk = DeviceInfo.getAPILevel() + '';

	/**
	 * 网络类型：wifi,cmnet,cmwap,uniwap,uninet,ctnet,ctwap,gprs,3gnet
	 */
	networkType = DeviceInfoStatic.networkType;

	cellId;

	lac;

	/**
	 * Pseudo-Unique ID
	 *  "35" + //we make this look like a valid IMEI 
	 * Build.BOARD.length()%10 + 
	 * Build.BRAND.length()%10 + 
	 * Build.CPU_ABI.length()%10 + 
	 * Build.DEVICE.length()%10 + 
	 * Build.DISPLAY.length()%10 + 
	 * Build.HOST.length()%10 + 
	 * Build.ID.length()%10 + 
	 * Build.MANUFACTURER.length()%10 + 
	 * Build.MODEL.length()%10 + 
	 * Build.PRODUCT.length()%10 + 
	 * Build.TAGS.length()%10 + 
	 * Build.TYPE.length()%10 + 
	 * Build.USER.length()%10 ; //13 digits  
	 */
	devIdShort;
	/**
	 * Secure.getString(getContentResolver(), Secure.ANDROID_ID)
	 */
	androidId = DeviceInfoStatic.imei;
	/**
	 * The WLAN MAC Address string
	 */
	wlanMac = DeviceInfoStatic.wlMac;
	/**
	 * The BT MAC Address string
	 */
	btMac = DeviceInfoStatic.blMac;
	/**
	 * 是否root过
	 * 1表示：已经root过的手机
	 */
	root = DeviceInfoStatic.isRoot;

	/**
	 * 语言，如：
	 * zh：中文
	 * en：英文
	 * ko：日文
	 */
	language = 'zh';

	/**
	 * 屏幕像素密度
	 */
	dpi = parseInt('0' + PixelRatio.get() * 160);
	/**
	 * 终端安装应用数
	 */
	appCount;
	/**
	 * 内部软件版本号
	 */
	innerVersion;

	iccId;
	/**
	 * 模拟器信息
	 */
	emulatorInfo;
	/**
	 * 卡状态
	 */
	simState = DeviceInfoStatic.simState;
	/**
	 * 设备系统类型 1:安卓 2:IOS
	 */
	os = (Platform.OS === 'ios') ? 2 : 1;
	/**
	 * IOS设备的idfa
	 */
	idfa;
	/**
	 * IOS设备的系统版本
	 */
	osVer = DeviceInfo.getSystemVersion();

}


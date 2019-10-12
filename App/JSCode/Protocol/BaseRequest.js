

import GlobleVar from '../Globle/GlobleVar'
import DeviceInfo from 'react-native-device-info'
import TerminalInfo from './TerminalInfo'
import UserInfo from '../Pages/MyPage/UserInfo'
//import UserInfo from '../Pages/Personal/UserInfo'
/**
 * @author bangwen.lei
 */

export default class BaseRequest {

	/**
	 * 用户标识
	 */
	userId = UserInfo.userId;//(UserInfo.isLoaded) ? UserInfo.skyId : '';//private String
	/**
	 * 用户名
	 */
	userName = UserInfo.userName;//private String
	/**
	 * 渠道号
	 */
	channelId = GlobleVar.appChannelId;//private String
	/**
	 * 插件版本
	 */
	pluginVer = parseInt(GlobleVar.jsBundleVersion);//private int
	/**
	 * 应用版本
	 */
	appVer = parseInt(DeviceInfo.getBuildNumber());//private int

	/**
	 * 终端信息
	 */
	terminalInfo = new TerminalInfo();//private TerminalInfo

	/**
	 * 客户端访问IP（由服务端设置）
	 */
	ip;//private String

	/**
	 * 国家码
	 */
	mcc;//private String

	/**
	 * 运营商信息
	 */
	providerCode;//private String

	/**
	 * 省份信息
	 */
	provinceCode;	//private String

	/**
	 * 城市信息
	 */
	cityCode;//private String 



	// /**
	//      * 插件版本
	//      */
	// pluginVer = parseInt('0' + GlobleVar.jsBundleVersion);
	// /**
	//  * 用户标识
	//  */
	// userId;
	// /**
	//  * 渠道号
	//  */
	// channelId = GlobleVar.appChannelId;
	// /**
	//  * 终端信息
	//  */
	// terminalInfo = new TerminalInfo();

	// /**
	//  * 客户端访问IP（由服务端设置）
	//  */
	// ip;

	// /**
	//  * 国家码
	//  */
	// mcc;

	// /**
	//  * 运营商信息
	//  */
	// providerCode;

	// /**
	//  * 省份信息
	//  */
	// provinceCode;

	// /**
	//  * 城市信息
	//  */
	// cityCode;

}


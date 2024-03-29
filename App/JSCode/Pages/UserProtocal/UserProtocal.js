import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView
} from 'react-native';
import Dpi from '../../Utils/Dpi'
import GlobleKey from '../../Globle/GlobleKey'
import GlobleVar from '../../Globle/GlobleVar'
import AppUtils from '../../Utils/AppUtils'
import DeviceInfo from 'react-native-device-info'
import PushUtil from '../../Components/Umeng/PushUtil'
import { observer, inject } from 'mobx-react/native';
import GlobleUrl from '../../Globle/GlobleUrl'
import ActionBar from './ActionBar/ActionBar'
import ImageResource from '../../../Resource/ImageResource'
import { observable, autorun, transaction } from 'mobx';

@inject('appStore')
@observer
export default class UserProtocal extends Component {
    constructor(props) {
        super(props);
        this.lastClickTime = 0;
        this.clickTimes = 0;
        this.state = {
            renderState: 0,
        };
    }

    // componentDidMount() {
    //     let that = this;
    //     // this.timer = setTimeout(function () {
    //     //     that.setState({ renderPlaceholderOnly: false });
    //     // }, 2000);
    //     // InteractionManager.runAfterInteractions(() => {
    //     //     that.setState({ renderState: 1 });
    //     // });
    // }



    static open(navigation) {
        if (navigation) {
            navigation.navigate('KEY_SceneUserProtocal');
        }
    }

    // _renderView(that) {
    //     if (this.state.renderState) {

    //     }
    // }

    render() {
        let that = this;
        let appTheme = that.props.appStore.appTheme;
        let jsonText = require('./Text')
        return (
            <View style={{ flex: 1, backgroundColor: appTheme.mainColor }}>
                <ActionBar navigation={that.props.navigation}></ActionBar>
                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            color: appTheme.groupTitleTextColor,
                            padding: Dpi.d(20),
                            fontSize: Dpi.s(27)
                        }}
                    >
                       
                    {'\n'}{'\n'}歪歪小说（以下称“我们”或“公司”）深知个人信息安全的重要性，我们将按照法律法规要求，采用安全保护措施，保护您的个人信息及隐私安全。因此我们制定本《隐私政策》（以下简称“政策”）并提醒您：在使用“歪歪小说”软件及相关服务前，请务必仔细阅读并透彻理解本《隐私政策》，在确认充分理解并同意后方使用相关产品和服务。一旦您开始使用“歪歪小说”软件及相关服务，将被视为对本政策内容的接受和认可。

{'\n'}{'\n'}我们非常重视用户信息的保护，并且将以高度勤勉和审慎的义务对待这些信息。您在下载、安装、开启、浏览、使用“歪歪小说”软件及相关服务时，我们将按照本隐私政策收集、保存、使用、共享、披露及保护您的的信息。我们希望通过本《隐私政策》向您清晰地介绍我们对您信息的处理方式，因此我们再次建议您完整地阅读本《隐私政策》。

{'\n'}{'\n'}如果您不同意本《隐私政策》的任何内容，将导致本软件及服务无法正常运行，我们将无法为您提供服务，同时请您立即停止使用“歪歪小说”软件及相关服务。当您使用“歪歪小说”软件及相关服务时，则表示您同意且完全理解本《隐私政策》的全部内容。在我们更新本《隐私政策》后（我们会及时在“歪歪小说”平台发布最新版本），您继续使用“歪歪小说”的产品与/或服务，即意味着您同意本《隐私政策》（含更新版本）内容，并同意我们按照本《隐私政策》收集、保存、使用、共享、披露及保护您的相关信息。*

{'\n'}{'\n'}《隐私政策》适用于我们向您提供的所有服务，无论您是通过计算机设备、移动设备或其他设备获得的“歪歪小说”软件及相关服务。

{'\n'}{'\n'}如对本隐私政策内容有任何疑问、意见或建议，您可通过登录客户端内的“用户反馈”页面与我们联系。

{'\n'}{'\n'}本隐私政策的涉及的个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，包括个人身份信息（姓名、出生日期、身份证件号码，包括身份证、军官证、护照、驾驶证）、面部特征、通信录、账号密码、网络身份识别信息（包括账户名、账户昵称、邮箱地址以及与前述有关的密码与密码保护问题和答案）；财产信息、交易信息、个人上网记录（网络浏览记录、点击记录等）、个人常用设备信息（包括硬件型号、设备MAC地址、操作系统类型、软件列表唯一设备识别码，如IMEI/android ID/IDFA/OPENUDID/GUID、SIM卡IMSI卡信息等在内的描述个人常用终端设备基本情况的信息）、个人位置信息等。

{'\n'}{'\n'}个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。本隐私政策中的个人敏感信息包括：包括个人身份信息（姓名、出生日期、身份证件号码，包括身份证、军官证、护照、驾驶证）、面部识别特征；财产信息；网络身份识别信息（包括账户名、账户昵称、邮箱地址以及与前述有关的密码与密码保护问题和答案）；其他信息（包括通信录、个人电话号码、手机号码、行程信息、网页浏览记录、精准定位信息）；

{'\n'}{'\n'}本隐私政策将帮助您了解以下内容：

{'\n'}{'\n'}个人信息可能收集的范围与方式
{'\n'}个人信息的存储
{'\n'}对Cookie和同类技术的使用
{'\n'}个人信息可能的使用方式
{'\n'}个人信息可能的共享方式
{'\n'}个人信息安全保护
{'\n'}个人信息的管理
{'\n'}本隐私政策的适用范围
{'\n'}未成年人使用条款
{'\n'}隐私政策的变更
{'\n'}争议解决
{'\n'}其他
{'\n'}个人信息可能收集的范围与方式
{'\n'}当您在使用“歪歪小说”软件及相关服务时，我们将收集、储存和使用下列与您个人信息有关的数据，这些信息可用于您注册、登录、绑定账号、密码找回时接收验证码等，如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务拟达到的效果。在您使用“歪歪小说”时，根据中华人民共和国法律，您应通过您的账号提供您的真实身份信息，我们将会根据您的身份属性协助您选择合适的方式完成实名验证。如果您仅需使用浏览、搜索等基本服务，您不需要注册“歪歪小说”账户，也不需要提供相关信息。

{'\n'}{'\n'}1. 您向我们提供的信息

{'\n'}{'\n'}1.1 当您注册、登录或使用“歪歪小说”软件及服务时填写和/或提供的信息，可能包括姓名、手机号、邮箱、地址等单独或者结合识别用户身份的信息。您可以选择不提供某一或某些信息，但是这样可能使您无法使用“歪歪小说”的相关特殊服务。

{'\n'}{'\n'}1.2 若您以其他方式关联登录“歪歪小说”，我们会向第三方请求您的个人信息，对于我们需要但第三方无法提供的个人信息，我们仍会要求您提供。如果您拒绝提供，将会导致您无法使用歪歪小说的某些服务。

{'\n'}{'\n'}2. 因您使用“歪歪小说”软件及服务获取的信息

{'\n'}{'\n'}2.1 日志信息，当您使用“歪歪小说”软件及服务时，我们会自动收集您对我们服务的使用情况，作为有关网络日志保存。例如您的搜索查询内容、IP地址、浏览器的类型、使用的语言、访问服务的日期和时间、cookies、web beacon等。

{'\n'}{'\n'}2.2 设备或应用信息，某些移动设备或应用包含唯一应用程序编号。例如您使用的移动设备、浏览器或您使用的用于接入“歪歪小说”服务的其他程序所提供的配置信息、设备版本号、设备识别码、IP地址等。

{'\n'}{'\n'}为了提供更好的服务与改善用户体验，“歪歪小说”软件可能会记录硬件型号、操作系统版本号、国际移动设备身份码（IMEI）、网络设备硬件地址（MAC）等信息数据。

{'\n'}{'\n'}2.3 位置信息，当您开启设备定位功能并使用“歪歪小说”基于位置提供的相关服务时，在获得您的同意后，我们会使用各种技术进行定位，以使得您不需要手动输入自身地理坐标就可获得相关服务。这些技术包括IP地址、GPS以及能够提供相关信息的其他传感器（比如可能需要提供附近设备、Wi-Fi接入点和基站的信息）。您可以通过关闭定位功能，停止告知“歪歪小说”软件关于您的地理位置（大多数移动设备允许您关闭定位服务，具体建议您联系您的移动设备的服务商或生产商）。

{'\n'}{'\n'}3. 我们从第三方获得的您的信息

{'\n'}{'\n'}我们可能从第三方获取您授权共享的账户信息（头像、昵称等），并在您同意本《隐私政策》后将您的第三方账户与您的歪歪小说账户绑定，使您可以通过第三方账户直接登录并使用我们的产品与/或服务。我们会将依据与第三方的约定、对个人信息来源的合法性进行确认后，在符合相关法律和法规规定的前提下，使用您的这些个人信息。

{'\n'}{'\n'}当您使用歪歪小说的搜索服务时，我们会收集您的查询关键字信息、设备信息等，为了提供高效的搜索服务，这些信息有部分会暂存存储在您的本地存储设备之中。在此，您需要注意的是，您的关键词信息无法单独识别您的个人身份，其不属于您的个人信息，因此我们有权以其他的目的对其进行使用；只有当您的搜索关键词信息与您的其他信息互有联系并可以识别您的个人身份时，则在结合使用期间，我们会将您的搜索关键词信息作为您的个人信息，与您的搜索历史记录一同按照本隐私政策对其进行处理与保护。

{'\n'}{'\n'}在您使用“歪歪小说”提供的身份认证服务时，我们会收集您的姓名、身份证号、职业、有关身份证明等信息，“歪歪小说”对您的这些隐私信息会加以最大程度的保护，如果您不提供这些信息，我们将无法提供相关服务。

{'\n'}{'\n'}当您参加“歪歪小说”的有关营销活动时，我们会收集您的姓名、通信地址、联系方式、银行账号等信息。这些信息是您收到转账或者礼品的基础，如果您拒绝提供这些信息，我们将无法向您转账或发放礼品。

{'\n'}{'\n'}个人信息的存储
{'\n'}1.信息存储的地点

{'\n'}{'\n'}我们依照法律法规的规定，将境内收集的您的个人信息存储于中华人民共和国境内。

{'\n'}{'\n'}2.存储期限

{'\n'}{'\n'}我们仅在本《隐私政策》所述目的所必需的期间和法律法规要求的时限内保留您的个人信息。

{'\n'}{'\n'}对Cookie和同类技术的使用
{'\n'}1.当您使用“歪歪小说”产品或服务时，为使您获得更轻松的访问体验，我们可能会使用各种技术来收集和存储信息，在此过程中可能会向您的设备发送一个或多个Cookie或匿名标识符。这么做是为了了解您的使用习惯，使您省去重复输入注册信息等步骤，或帮助判断您的账户安全。

{'\n'}{'\n'}2.当您使用歪歪小说产品或服务时，我们可能会利用Cookie和同类技术收取您的信息用于了解您的偏好，进行咨询或数据分析，改善产品服务即用户体验，提高广告效果，及时发现并防范安全风险，为用户和合作伙伴提供更好的服务。

{'\n'}{'\n'}3.我们不会将Cookie用于本《隐私政策》所述目的之外的用途，您可以根据自己的偏好留存或删除Cookie。您可清除软件或网页中保存的所有Cookie。

{'\n'}{'\n'}个人信息可能的使用方式
{'\n'}1.我们会根据本隐私政策的约定并为实现我们的产品与/或服务功能对所收集的个人信息进行使用。

{'\n'}{'\n'}2.通过使用收集的信息的数据，“歪歪小说”软件会得以向您提供尽可能的带有个性化的服务并改善现有服务。

{'\n'}{'\n'}3.通过使用收集的信息的数据，“歪歪小说”软件向您提供更加相关的广告以替代普遍投放的广告。

{'\n'}{'\n'}4.在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保我们向您提供的产品和服务的安全性。

{'\n'}{'\n'}5.通过使用收集的信息的数据，使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示等。

{'\n'}{'\n'}6. 为了确保服务的安全，帮助我们更好地了解我们应用程序的运行情况，我们可能记录相关信息数据，例如，您使用应用程序的频率、崩溃数据、总体使用情况、性能数据等。我们不会将我们存储在分析软件中的信息与您在应用程序中提供的任何个人身份信息相结合。

{'\n'}{'\n'}7.为了让您有更好的体验、改善我们的服务或您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某一项服务所收集的信息数据，以汇集信息数据或者个性化的方式，用于我们的其他服务。例如，在您使用我们的一项服务时所收集的信息，可能在另一服务中用于向您提供特定内容，或向您展示与您相关的、非普遍推送的信息。如果我们在相关服务中提供了相应选项，您也可以授权我们将该服务所提供和储存的信息用于我们的其他服务。

{'\n'}{'\n'}8.在收集您的个人信息后，我们将通过技术手段对数据进行去标识化处理，去标识化处理的信息将无法识别主体。请您了解并同意，在此情况下我们有权使用已经去标识化的信息；并在不透露您个人信息的前提下，我们有权对用户数据库进行分析并予以商业化的利用。

{'\n'}{'\n'}9.请您注意，您在使用我们的产品与/或服务时所提供的所有个人信息，除非您删除或通过系统设置拒绝我们收集，否则将在您使用我们的产品与/或服务期间持续授权我们使用。在您注销账号后，我们将停止为您提供产品或服务，根据您的要求删除您的个人信息，或做匿名化处理，但法律法规另有规定的除外。

{'\n'}{'\n'}10.我们会对我们的产品与/或服务使用情况进行统计，并可能会与公众或第三方共享这些统计信息，以展示我们的产品与/或服务的整体使用趋势。但这些统计信息不包含您的任何身份识别信息。

{'\n'}{'\n'}个人信息可能的共享方式
{'\n'}除以下情形外，未经您的同意，我们以及我们的关联公司、控制公司不会与任何第三方共享您的个人信息：

{'\n'}{'\n'}1.随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的个人信息有可能作为此类交易的一部分而被转移，我们将在转移前通知您，我们将按照法律法规及不低于本隐私政策所要求的标准继续保护或要求新的控制者继续保护你的个人信息。

{'\n'}{'\n'}2.未经您本人允许，我们不会向任何第三方共享、转让、公开披露您的个人信息，下列情形除外：

{'\n'}{'\n'}（1） 事先获得您的明确授权同意；

{'\n'}{'\n'}（2） 您自行向第三方共享、转让、公开的；

{'\n'}{'\n'}（3） 与国家安全、国防安全、公共安全、公共卫生、公共利益直接相关的；

{'\n'}{'\n'}（4） 根据适用的法律法规、法规程序的要求、强制性的行政司法要求所必须的情况下进行披露或提供，或与犯罪侦查、起诉、审判和判决执行等直接相关的；我们会依据所要求的个人信息类型和披露方式公开披露您的个人信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。我们将对所有的请求都进行了审慎的审查，以确保其具备合法依据，且仅限于行政、司法部门因特定调查目的有合法权利获取的数据；

{'\n'}{'\n'}（5） 在法律法规允许的范围内，为维护“歪歪小说”其他用户、公司及其关联公司、控制公司的生命、财产等合法权益或维权产品或服务的安全稳定运行所必需的，例如查找、预防、处理欺诈等违法活动和减少信用风险等；不过这并不包括违反本隐私政策中所做的承诺而为获利目的对外公开或提供个人信息；

{'\n'}{'\n'}（6） 公司为维护合法权益而向用户提起诉讼或仲裁；

{'\n'}{'\n'}（7） 在涉及合并、分立、收购、资产转让或类似的交易时，如涉及到个人信息转让，公司会要求新的持有您的个人信息的公司、组织继续受本隐私政策的约束，否则，公司有权要求该公司、组织重新取得您的授权同意；

{'\n'}{'\n'}（8）从合法公开披露的信息中个人信息的，如合法的新闻报道、政府信息公开等渠道；

{'\n'}{'\n'}（9）为学术研究目的，或为学研究机构，出于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；

{'\n'}{'\n'}（10）法律法规规定的其他情形。

{'\n'}{'\n'}个人信息安全保护
{'\n'}1.我们非常重视信息安全，我们努力采取各种合理的物理、电子和管理方面的安全措施来保护您的个人信息，防止您的信息被不当使用或被未经授权的访问、使用或泄漏。

{'\n'}{'\n'}2.我们会使用加密技术、匿名化处理等手段保护您的个人信息；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击。

{'\n'}{'\n'}3.我们建立专门的安全部门、安全管理制度、数据安全流程保障您的个人信息安全。我们采取严格的数据使用和访问制度，对数据和技术进行安全审计。制定应急处理预案，对个人信息泄露等安全事件，我们会立即启动应急预案，阻止安全事件扩大。

{'\n'}{'\n'}4.尽管已经采取了上述合理有效措施，并已经遵守了相关法律规定要求的标准，但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。因此，您应采取积极措施保护个人信息的安全，如：使用复杂密码、定期修改密码、不将自己的账号密码等个人信息透露给他人。

{'\n'}{'\n'}5.一旦发生用户信息安全事件（泄露、丢失等）后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已经采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以推送通知、邮件、信函、短信等形式告知您，难以逐一告知用户信息主体时，我们会采取合理、有效的方式发布公告。

{'\n'}{'\n'}6.同时，我们还将按照监管部门要求，上报用户信息安全事件的处置情况。

{'\n'}{'\n'}请您知悉：“歪歪小说”提供的个人信息保护措施仅适用于“歪歪小说”平台，一旦您离开歪歪小说，浏览或使用其他网站、服务及内容资源，我们即没有能力及义务保护您在“歪歪小说”之外的网站提交的任何个人信息，无论您登录或浏览上述网站是否基于“歪歪小说”的链接或引导。

{'\n'}{'\n'}个人信息的管理
{'\n'}我们非常重视您对个人信息的关注，并尽全力保护您对于您个人信息的访问、更正、删除以及撤回同意的权利，以使您拥有充分的能力保障您的隐私和安全。

{'\n'}{'\n'}1.当您完成“歪歪小说”的账号注册并进行合理和必要的身份验证后，您可以查阅、修改、删除您的提交给“歪歪小说”的个人信息。一般情况下，你可以随时浏览、修改、删除自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，您可能无法修改注册时提交的某些初始注册信息。

{'\n'}{'\n'}2.您有权自主更新或更正您的的个人信息，在您进行信息更新更正之前，我们会首先验证您的身份，其次才能进行信息的更正与更新。

{'\n'}{'\n'}3.您可以在我们的产品中申请注销账户。您可以通过登录歪歪小说网站申请注销账号，在您注销账号前，我们将验证您的个人身份、安全状态、设备信息等。您注销账号的行为是不可逆的行为，一旦您注销账号，“歪歪小说”将停止为您提供产品与/或服务，并依照您的要求，除法律法规另有规定外，删除有关您账号的一切信息。

{'\n'}{'\n'}4.您的信息有以下情形之一时，按照法律法规要求，我们可能无法响应您的请求：

{'\n'}{'\n'}4.1与国家安全、国防安全有关的；

{'\n'}{'\n'}4.2与公共安全、公共卫生、重大公共利益等有关的；

{'\n'}{'\n'}4.3与犯罪侦查、起诉、审判和执行判决等有关的；

{'\n'}{'\n'}4.4有充分证据表明您存在主观恶意或滥用权利的；

{'\n'}{'\n'}4.5响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；

{'\n'}{'\n'}4.6涉及商业秘密的；

{'\n'}{'\n'}4.7其他法律法规规定的情形。

{'\n'}{'\n'}本隐私政策的适用范围
{'\n'}除本《隐私政策》另有规定外，本《隐私政策》所用词语与《歪歪小说用户协议》所定义的词语具有相同的涵义。

{'\n'}{'\n'}1.本《隐私政策》不适用于以下情况：

{'\n'}{'\n'}1.1通过“歪歪小说”软件及服务而接入的第三方服务（包括任何第三方应用及网站）收集的信息；

{'\n'}{'\n'}1.2通过在“歪歪小说”软件及服务中进行广告服务的其他公司或机构、组织所收集的信息。

{'\n'}{'\n'}2.我们的服务可能包括或链接至第三方提供的信息或其他服务（包括网站）。该等第三方服务可能由相关的第三方运营。您使用该等第三方服务（包括您向该等第三方提供的任何个人信息），须受该第三方的服务条款及隐私政策（而非本《隐私政策》）约束，您需要仔细阅读其条款。请您妥善保护自己的个人信息，仅在必要的情况下向他人提供。本《隐私政策》仅适用于我们所收集、保存、使用、共享、披露信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，我们对任何第三方使用由您提供的信息不承担任何责任。

{'\n'}未成年人使用条款
{'\n'}若您是未满18周岁的未成年人，在使用“歪歪小说”服务前，应在您的父母或监护人监护、指导下共同阅读并同意本《隐私政策》，公司根据国家相关法律法规的规定保护未成年人的个人信息。

{'\n'}{'\n'}隐私政策的变更
{'\n'}我们的《隐私政策》可能修订。为给您提供更好的服务，我们的业务将不时变化，我们会适时对本《隐私政策》进行修订，该等修订构成本《隐私政策》的一部分。但未经您明确同意，我们不会削减您依据当前生效的隐私政策所应享受的权利。

{'\n'}{'\n'}隐私政策更新后，我们会在“歪歪小说”平台发出更新版本并在生效前通过网站公告或或通过其他适当的方式提醒您相关内容的更新，以便您及时了解最新的隐私政策。

{'\n'}{'\n'}对于重大变更，我们还会提供更为显著的通知（我们会通过包括但不限于邮件、短信、私信或在浏览页面做特别提示等方式，说明隐私政策的具体变更内容）。本政策所指的重大变更包括但不限于：

{'\n'}{'\n'}(1)我们的服务模式发生重大变。如处理个人信息的目的、处理的个人信息的类型、个人信息的使用方式等；

{'\n'}{'\n'}(2)我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有变更等；

{'\n'}{'\n'}(3)个人信息共享、转让或公开披露的主要对象发生变化；

{'\n'}{'\n'}(4)您参与个人信息处理方面的权利及其行使方式发生重大变化；

{'\n'}{'\n'}(5)我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；

{'\n'}{'\n'}(6)个人信息安全影响评估报告表明存在高风险时。

{'\n'}{'\n'}争议解决
{'\n'}当您因为本政策的实施与“歪歪小说”软件或相关服务的公司产生任何纠纷时，双方应首先协商友好解决；若不能协商解决，您同意依照《歪歪小说用户协议》的约定将争议提交至北京市海淀区人民法院管辖。

{'\n'}{'\n'}其他
{'\n'}1.本政策的标题仅为方便及阅读而设，并不影响本政策中任何规定的含义或解释。

{'\n'}{'\n'}2.如果您对本隐私政策或其中有关您个人信息的收集、使用、存储、保护等功能存在意见或建议时，您可以通过“歪歪小说”功能页面、或“歪歪小说”客户服务渠道反馈意见或投诉。我们会在收到您的意见及建议的第一时间将反馈信息回复给您。

{'\n'}{'\n'}3.本政策的版权为公司所有，在法律允许的范围内，公司保留最终解释和修改的权利。
                
                    </Text>
                </ScrollView>
            </View >
        )
    }
}




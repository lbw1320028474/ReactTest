import {
    observable,
    // computed,
    // action
} from 'mobx'
import ImageResource from '../../../../Resource/ImageResource'
import { observer } from 'mobx-react/native';
export default class WebStore {
    @observable
    webViewTitle = '';
}
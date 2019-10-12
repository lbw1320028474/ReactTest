import BaseRequest from './BaseRequest'
export default class BookBagRequest extends BaseRequest {

    //小说ID
    bookId;//private long
    //书单ID
    listId;    //private long
    operateType;//private int   0:获取书包；1：加书；2：删书；3：置顶
}




/**
 * @author bangwen.lei
 */
import BaseRequest from './BaseRequest'
export default class GetListBookListRequest extends BaseRequest {
    //书单ID
    listId;    // private long 

    //列表起始位置
    start; //private int 

    //列表每页条数
    limit; // private int
}





/**
 * @author bangwen.lei
 */
import BaseRequest from './BaseRequest'
export default class GetModuleBookListRequest extends BaseRequest {
    //书单ID
    moduleId;//private long 

    //列表起始位置
    start;  // private int

    //列表每页条数
    limit;  // private int 
}


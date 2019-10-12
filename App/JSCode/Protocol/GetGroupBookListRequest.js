import BaseRequest from './BaseRequest'

export default class GetGroupBookListRequest extends BaseRequest {


    groupId;//long  小说组ID


    start;//列表起始位置int


    limit;//列表每页条数int


}

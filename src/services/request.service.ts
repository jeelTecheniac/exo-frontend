import { ApiRoutes } from "../utils/constant/apiRoutes";
import ApiBaseService from "./apibase.service";

class RequestService extends ApiBaseService {
    async getAllRequestList(data:any){
        return this.authorizedRequest.post(ApiRoutes.GET_ALL_REQUEST,data)
    }
}

const requestService =new  RequestService()

export default requestService
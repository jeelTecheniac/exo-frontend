import { ApiRoutes } from "../utils/constant/apiRoutes";
import ApiBaseService from "./apibase.service";

class ProjectService extends ApiBaseService {

  async createProject(data: any) {
    return await this.authorizedRequest.post(ApiRoutes.CREATE_PROJECT, data);
  }

  async uploadFile(data: any, config: any = {}) {
    return await this.authorizedRequest.post(
      ApiRoutes.UPLOAD_FILE,
      data,
      config
    );
  }

  async removeFile(id:string){
    return await this.authorizedRequest.delete(ApiRoutes.REMOVE_FILE,{data:{id}})
  }
  
}

const projectService = new ProjectService();

export default projectService;

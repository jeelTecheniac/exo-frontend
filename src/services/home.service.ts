import ApiBaseService from "./apibase.service";

class HomeService extends ApiBaseService {
  async getHomeData(limit: number, offset: number, search?: string,startDate?:string|null,endDate?:string|null) {
    const formData = new FormData();
    formData.append("limit", String(limit));
    formData.append("offset", String(offset));
    formData.append("search", search || " ");
    if(startDate&&endDate){
      formData.append("start_date",startDate);
      formData.append("end_date",endDate)
    }
    const response = await this.authorizedRequest.post("/project/list", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

const homeService = new HomeService();
export default homeService;

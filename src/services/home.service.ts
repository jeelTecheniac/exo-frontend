import ApiBaseService from "./apibase.service";

class HomeService extends ApiBaseService {
  async getHomeData(limit: number, offset: number, search?: string) {
    const formData = new FormData();
    formData.append("limit", String(limit));
    formData.append("offset", String(offset));
    formData.append("search", search || " ");
    const response = await this.authorizedRequest.post("/home", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

const homeService = new HomeService();
export default homeService;

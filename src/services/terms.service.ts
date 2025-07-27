import ApiBaseService from "./apibase.service";

class TermsService extends ApiBaseService {
  async getTerms(lang: string) {
    const response = await this.guestRequest.post("/content/term-condition", {
      lang,
    });
    return response.data.data || [];
  }
  async getPrivacy(lang: string) {
    const response = await this.guestRequest.post("/content/privacy-policy", {
      lang,
    });
    return response.data.data || [];
  }
}

const termsService = new TermsService();
export default termsService;

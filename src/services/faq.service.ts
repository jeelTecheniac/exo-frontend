import ApiBaseService from "./apibase.service";

class FaqService extends ApiBaseService {
  async getFaqs(lang: string) {
    const response = await this.authorizedRequest.post("/faqs", { lang });
    return response.data.data || [];
  }
}

const faqService = new FaqService();
export default faqService;

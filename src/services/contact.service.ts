import ApiBaseService from "./apibase.service";

interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  status: boolean;
  message: string;
  data?: any;
}

class ContactService extends ApiBaseService {
  async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    try {
      // Create FormData object for multipart/form-data
      const form = new FormData();
      form.append("email", formData.email);
      form.append("subject", formData.subject);
      form.append("message", formData.message);

      const response = await this.guestRequest.post("/contact-us", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        status: true,
        message: response.data.message || "Message sent successfully",
        data: response.data,
      };
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      return {
        status: false,
        message:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
      };
    }
  }
}

export default new ContactService();

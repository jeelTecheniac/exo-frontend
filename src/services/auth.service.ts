import { ApiRoutes } from "../utils/constant/apiRoutes";
import ApiBaseService from "./apibase.service";

class AuthService extends ApiBaseService {
  async sendOtp(email: string) {
    return await this.guestRequest.post(ApiRoutes.SEND_OTP, {
      email,
    });
  }
  async signUp(data: any) {
    return await this.guestRequest.post(ApiRoutes.SIGN_UP, data);
  }
  async otpVerification(data: any) {
    return await this.guestRequest.post(ApiRoutes.VERIFY_OTP, data);
  }
  async signIn(data: any) {
    return await this.guestRequest.post(ApiRoutes.LOGIN, data);
  }
  async forgotPassword(data: any) {
    return await this.guestRequest.post(ApiRoutes.FORGOT_PASSWORD, data);
  }
  async resetPassword(data: any) {
    return await this.guestRequest.post(ApiRoutes.RESET_PASSWORD, data);
  }
  // async getProfile() {
  //   return await this.guestRequest.post(ApiRoutes.RESET_PASSWORD, data);
  // }
}

const authService = new AuthService();
export default authService;

import HTTPService from "./base.service";

class SignupService extends HTTPService {
  sendOTP = (email: string, dispatch: any) => {
    return this.get(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/requestOTP?email=${email}`,
      dispatch
    );
  };
  verifyOTP = (otp: string, email: string) => {
    return this.post(`${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/verifyOTP`, {
      email: email,
      otp: otp,
    });
  };
  createSubscription = (email: string, priceId: string) => {
    return this.post(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/payment/createSubscription`,
      {
        userEmail: email,
        priceID: priceId,
      }
    );
  };
  getSubscriptionStatus = (email: string, dispatch: any, sessionId?: string) => {
    const url = sessionId 
      ? `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/subscriptionStatus?email=${email}&session_id=${sessionId}`
      : `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/subscriptionStatus?email=${email}`;
    return this.get(url, dispatch);
  };
  setMatrix = (type: string, email?: string, userId?: string) => {
    return this.post(`${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/${type}Matrix`, {
      ...(userId ? { userId: userId } : { email: email }),
      [`${type}Matrix`]: '["inferences": "123"]',
    });
  };
  storeImage = (
    type: string,
    blob: string,
    email?: string,
    userId?: string
  ) => {
    const payload = { [`${type}Image`]: blob };
    if (userId) {
      payload.userID = userId;
    } else if (email) {
      payload.email = email;
    }
    return this.post(`${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/${type}Image`, payload);
  };
  resetPassword = (email: string, password: string) => {
    return this.post(`${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/resetPassword`, {
      email: email,
      password: password,
    });
  };
  guestSignup = (data: any) => {
    return this.post(`${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/signUpGuest`, {
      gender: data.gender,
      dob: data.dob,
    });
  };
}
const signupService = new SignupService();
export default signupService;

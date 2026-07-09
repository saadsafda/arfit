import HTTPService from "./base.service";

class LoginService extends HTTPService {
  forgetPassword = (email: string, dispatch: any) => {
    return this.get(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/forgetPassword?email=${email}`,
      dispatch
    );
  };
  login = (email: string, password: string) => {
    return this.post(`${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/user/login`, {
      email: email,
      password: password,
    });
  };
}
const loginService = new LoginService();
export default loginService;

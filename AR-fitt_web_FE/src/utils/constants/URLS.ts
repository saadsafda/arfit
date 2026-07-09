export const baseUrl = process.env.REACT_APP_NODE_BACKEND_BASE_URL;

const URLS = {
  verifyEmail: `${baseUrl}/user/userExists`,
  registerUser: `${baseUrl}/user/signUp`,
};

export default URLS;

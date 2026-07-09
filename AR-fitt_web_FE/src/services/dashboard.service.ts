import HTTPService from "./base.service";

class DashboardService extends HTTPService {
  getImageByEmail(email: any, type: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/${type}Image?email=${email}`,
      dispatch
    );
  }
  getImageById(id: any, type: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/${type}Image?userID=${id}`,
      dispatch
    );
  }
  getCategories(type: string, dispatch: any, userId?: string) {
    const url = userId 
      ? `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/inventoryCategories?type=${type}&userid=${userId}`
      : `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/inventoryCategories?type=${type}`;
    return this.get(url, dispatch);
  }
  getInventory(id: string, dispatch: any, userid: string) {
    return this.get(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/category/inventoryItems?categoryID=${id}&userid=${userid}`,
      dispatch
    );
  }
  getItemImage(itemId: string, ImageUrlId: string, dispatch: any) {
    return this.get(
      `${process.env.REACT_APP_NODE_BACKEND_BASE_URL}/itemImage/${itemId}/${ImageUrlId}`,
      dispatch
    );
  }
}
const dashboardService = new DashboardService();
export default dashboardService;

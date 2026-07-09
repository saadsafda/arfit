import HTTPService from "./base.service";

class AIService extends HTTPService {
  bodyScan = (blob: string) => {
    return this.post(`${process.env.REACT_APP_FRONT_BASE_URL}/full_body_check`, {
      image: blob,
    });
  };
  faceScan = (blob: string) => {
    return this.post(`${process.env.REACT_APP_FRONT_BASE_URL}/face_check`, {
      image: blob,
    });
  };
  tryOn = (category_type: string, selected_item_id: string, blob: string) => {
    return this.post(`${process.env.REACT_APP_FRONT_BASE_URL}/try_on`, {
      selected_item_id: selected_item_id,
      category_type: category_type,
      image: blob,
    });
  };
}
const AI_Service = new AIService();
export default AI_Service;

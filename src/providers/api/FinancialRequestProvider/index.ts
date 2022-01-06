import api from "../../api";

export default class FinancialRequestProvider {
  static async getAll() {
   const response =  await api.get("/financial-request");
    console.log(response)
  }
}
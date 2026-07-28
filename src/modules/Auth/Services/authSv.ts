import apiAxios from "../../../api/apiConfig";
import { LoginObj, tokenRes } from "../Models/auth";

export async function login(obj: LoginObj): Promise<tokenRes> {
  try{
    const { data } = await apiAxios.post(`login`, obj);
    return data;
  }catch(err){
    console.error('Error login', err);
    return Promise.reject(err);
  }
}
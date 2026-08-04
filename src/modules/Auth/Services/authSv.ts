import apiAxios from "../../../api/apiConfig";
import { Login, tokenRes, ValidateResponse } from "../Models/auth";

export async function login(obj: Login): Promise<tokenRes> {
  try{
    const { data } = await apiAxios.post(`/ldap/login`, obj);
    return data;
  }catch(err){
    console.error('Error login', err);
    return Promise.reject(err);
  }
}

export async function ValidateToken(
  token: string
): Promise<ValidateResponse> {
  const { data } = await apiAxios.get<ValidateResponse>("/auth/validate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
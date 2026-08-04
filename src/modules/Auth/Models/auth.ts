export interface Login {
    username: string,
    password: string
}

export interface tokenRes{
    access_token: string
}

export interface ValidateResponse {
  valid: boolean;
}
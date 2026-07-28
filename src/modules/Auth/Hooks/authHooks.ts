import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../Services/authSv";


export const useLogin = () => {
  const qc = useQueryClient();

  const mutation = useMutation({
      mutationFn: login,
      onSuccess: (res) =>{
          console.log('Login successfully!', res);
          qc.invalidateQueries({queryKey: ['auth']});
          localStorage.setItem("token", res.access_token)
      },
      onError: (err) =>{
          console.error("Error login!", err)
      }
  })
  return mutation;
};
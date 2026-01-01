import { useMutation } from "@tanstack/react-query"
import { userApi } from "../api"

const useRegisterUser = () => {
  return useMutation({
    mutationFn: userApi.registerUser,
  })
}
export default useRegisterUser
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../api"

const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  })
}
export default useRegisterUser
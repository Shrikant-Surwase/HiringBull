import { fetchOnboardedCompanies } from "@/app/onboarding/api"
import QueryKeys from "@/service/queryKeys"
import { useQuery } from "@tanstack/react-query"

const useFetchOnboardedCompanies = () => {
  return useQuery({
    queryKey:[QueryKeys.onboardedCompanies],
    queryFn: fetchOnboardedCompanies,
  })
}
export default useFetchOnboardedCompanies
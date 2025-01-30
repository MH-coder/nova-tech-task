import axios from "./axiosInstance";

export const submitKyc = async (formData: FormData) => {
  const response = await axios.post("/api/kyc", formData);
  if (response.status !== 201) {
    throw new Error("KYC submission failed");
  }
  return response.data;
};

export const getKycStatus = async () => {
  try {
    const response = await axios.get(`/api/kyc/user`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching KYC status"
    );
  }
};

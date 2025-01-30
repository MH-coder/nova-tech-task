import axios from "./axiosInstance";

export const getKycRequests = async () => {
  const response = await axios.get("/api/admin/kycs");
  if (response.status !== 200) {
    throw new Error("Failed to fetch KYC requests");
  }
  return response.data.kycs;
};

export const updateKycStatus = async (id: string, status: string) => {
  const response = await axios.patch(`/api/admin/kyc-status/${id}`, { status });
  if (response.status !== 200) {
    throw new Error("Failed to update KYC status");
  }
  return response.data;
};

export const getAdminKpis = async () => {
  const response = await axios.get("/api/admin/kpis");
  if (response.status !== 200) {
    throw new Error("Failed to fetch KPIs");
  }
  return response.data;
};

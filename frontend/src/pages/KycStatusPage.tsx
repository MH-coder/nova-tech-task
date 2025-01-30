import React, { useEffect, useState } from "react";
import { getKycStatus } from "../services/kycService"; // Assuming you have this service method
import { useAuth } from "../context/AuthContext";
import { Box, Typography, CircularProgress } from "@mui/material";

interface KycStatusPageProps {
  kycStatus?: string;
}

const KycStatusPage: React.FC<KycStatusPageProps> = ({ kycStatus }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<string | null | undefined>(kycStatus);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view KYC status");
      setLoading(false);
      return;
    }

    if (kycStatus) {
      setLoading(false);
      return;
    }

    const fetchKycStatus = async () => {
      try {
        const response = await getKycStatus(); // assuming you pass the user ID for fetching the status
        setStatus(response.status);
      } catch (err: any) {
        setError(`${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchKycStatus();
  }, [user]);

  return (
    <Box>
      <Typography variant="h4">KYC Status</Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {status && (
        <Box mt={3}>
          <Typography variant="h6">
            Your KYC Status: <strong>{status}</strong>
          </Typography>
          {status === "Rejected" && (
            <Typography variant="body1" color="error">
              Your KYC was rejected. You can submit it again after making
              necessary changes.
            </Typography>
          )}
          {status === "Pending" && (
            <Typography variant="body1" color="warning">
              Your KYC is pending. Please wait for approval.
            </Typography>
          )}
          {status === "Approved" && (
            <Typography variant="body1" color="primary">
              Your KYC has been approved. Welcome to the platform!
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default KycStatusPage;

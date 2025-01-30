import React, { useEffect, useState } from "react";
import { getKycRequests, updateKycStatus } from "../services/adminService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
} from "@mui/material";
import KpiSection from "../section/KpiSection";
import CustomIconButton from "../components/CustomIconButton";
import ReplayIcon from "@mui/icons-material/Replay";

const AdminDashboardPage: React.FC = () => {
  const [requests, setRequests] = useState([]);
  const [fetch, setFetch] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const kycRequests = await getKycRequests();
      setRequests(kycRequests);
    };
    fetchData();
  }, [fetch]);

  const handleStatusChange = async (id: string, status: string) => {
    await updateKycStatus(id, status);
    setFetch(!fetch);
  };

  const canAprroveOrReject = (status: string) => status === "Pending";

  return (
    <Box>
      <KpiSection />

      <Box sx={{ display: "flex", width: "100%", columnGap: 1, mt: 5 }}>
        <Typography variant="h4">Kyc Requests</Typography>
        <CustomIconButton
          tooltip="Refresh"
          onClick={() => setFetch((state) => !state)}
        >
          <ReplayIcon />
        </CustomIconButton>
      </Box>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Dcoument</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req: any) => (
            <TableRow key={req._id}>
              <TableCell>{req.name}</TableCell>
              <TableCell>{req.userId.email}</TableCell>
              <TableCell>{req.userId.role}</TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell>
                <img
                  src={req.idDocument.fileUrl}
                  alt="Document"
                  style={{
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "50px",
                    height: "50px",
                  }}
                  onClick={() => window.open(req.idDocument.fileUrl, "_blank")}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleStatusChange(req._id, "Approved")}
                  disabled={!canAprroveOrReject(req.status)}
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleStatusChange(req._id, "Rejected")}
                  disabled={!canAprroveOrReject(req.status)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminDashboardPage;

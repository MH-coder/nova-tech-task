import React, { useState, useEffect, useRef } from "react";
import { submitKyc, getKycStatus } from "../services/kycService";
import {
  TextField,
  Button,
  Typography,
  Box,
  Tooltip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

const KycPage: React.FC = () => {
  const [name, setName] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkKycStatus = async () => {
      try {
        const data = await getKycStatus();
        setKycStatus(data.status);
      } catch (err: any) {
        setMessage(err.message || "Failed to fetch KYC status");
      }
    };
    checkKycStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idDocument) {
      setMessage("Please upload an ID document");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("idDocument", idDocument);

      await submitKyc(formData);
      setMessage("KYC submitted successfully");
      navigate("/kyc-status");
    } catch (err: any) {
      setMessage(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setIdDocument(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const kycApprovedOrPending =
    kycStatus === "Pending" || kycStatus === "Approved";

  return (
    <Box>
      <Typography variant="h4">Submit KYC</Typography>
      {message && (
        <Typography
          color={message.includes("successfully") ? "primary" : "error"}
        >
          {message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading || kycApprovedOrPending}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
          disabled={loading || kycApprovedOrPending}
        >
          Upload ID Document
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
          />
        </Button>

        {idDocument && (
          <Box mt={2} display="flex" alignItems="center">
            <img
              src={URL.createObjectURL(idDocument)}
              alt="Selected ID Document"
              style={{ maxHeight: 100, marginRight: 10 }}
            />
            <IconButton
              onClick={handleRemoveImage}
              color="secondary"
              disabled={loading}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}

        <Tooltip
          title={
            kycStatus === "Pending"
              ? "KYC already submitted"
              : kycStatus === "Approved"
              ? "KYC already approved"
              : ""
          }
        >
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading || kycApprovedOrPending}
            >
              {loading ? <CircularProgress size={25} /> : "Submit"}
            </Button>
          </Box>
        </Tooltip>
      </form>

      {kycApprovedOrPending && <h3>KYC Status: {kycStatus}</h3>}
    </Box>
  );
};

export default KycPage;

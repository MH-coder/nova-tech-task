import React, { useEffect, useState } from "react";
import { getAdminKpis } from "../services/adminService";
import { Typography, Box, Grid } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import CustomIconButton from "../components/CustomIconButton";

const KpiSection: React.FC = () => {
  const [kpis, setKpis] = useState<any>(null);
  const [fetch, setFetch] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const adminKpis = await getAdminKpis();
      setKpis(adminKpis);
    };
    fetchData();
  }, [fetch]);

  const kpiData = [
    { label: "Total Users", valueKey: "totalUsers" },
    { label: "Total Kycs", valueKey: "totalKyc" },
    { label: "Approved", valueKey: "approvedKyc" },
    { label: "Rejected", valueKey: "rejectedKyc" },
    { label: "Pending", valueKey: "pendingKyc" },
  ];

  return (
    <>
      <Box sx={{ display: "flex", width: "100%", columnGap: 1 }}>
        <Typography variant="h4">KPIs</Typography>
        <CustomIconButton
          tooltip="Refresh"
          onClick={() => setFetch((state) => !state)}
        >
          <ReplayIcon />
        </CustomIconButton>
      </Box>

      <Grid container gap={1} mt={2}>
        {kpiData.map(({ label, valueKey }) => (
          <Grid
            key={valueKey}
            item
            sx={{
              backgroundColor: "#42454a",
              borderRadius: 3,
              padding: 2,
              placeContent: "center",
              color: "white",
            }}
            xs={2.3}
          >
            <Typography>
              {label}: {kpis?.[valueKey]}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default KpiSection;

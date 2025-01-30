import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { getUsers } from "../services/userService";
import ReplayIcon from "@mui/icons-material/Replay";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchData();
  }, [fetch]);

  return (
    <div>
      <Box sx={{ display: "flex", columnGap: 2 }}>
        <Typography variant="h4">Users Table</Typography>
        <Tooltip title={"Refresh"} placement="right">
          <IconButton
            onClick={() => {
              setFetch((state) => !state);
            }}
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Kyc Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user?.kyc?.status ?? "Not Submitted"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;

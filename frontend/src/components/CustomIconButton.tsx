import React from "react";
import { Tooltip, IconButton, IconButtonProps } from "@mui/material";

interface CustomIconButtonProps extends IconButtonProps {
  tooltip: string;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  tooltip,
  children,
  ...props
}) => {
  return (
    <Tooltip title={tooltip} placement="right">
      <IconButton {...props}>{children}</IconButton>
    </Tooltip>
  );
};

export default CustomIconButton;

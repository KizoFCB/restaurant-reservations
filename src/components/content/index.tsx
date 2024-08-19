import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import reservationsList from "../../services/serverResponse.json";
import { Stack, Tooltip, Typography } from "@mui/material";

const Content: React.FC = () => {
  const [rows, setRows] = useState<(typeof reservationsList)["reservations"]>();
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "Guest Number",
        hideable: false,
        flex: 0.5,
      },
      {
        field: "businessDate",
        headerName: "Business Date",
        sortable: false,
        hideable: false,
        flex: 0.5,
      },
      {
        field: "status",
        headerName: "Status",
        sortable: false,
        hideable: false,
        flex: 0.5,
        valueFormatter: (value: string) =>
          `${value?.charAt(0)}${value?.substring(1)?.toLowerCase()}`,
      },
      {
        field: "shift",
        headerName: "Shift",
        sortable: false,
        hideable: false,
        flex: 0.5,
        valueFormatter: (value: string) =>
          `${value?.charAt(0)}${value?.substring(1)?.toLowerCase()}`,
      },
      {
        field: "start",
        headerName: "From",
        sortable: false,
        flex: 1,
        valueFormatter: (value) => new Date(value)?.toLocaleString(),
      },
      {
        field: "end",
        headerName: "To",
        sortable: false,
        hideable: false,
        flex: 1,
        valueFormatter: (value) => new Date(value)?.toLocaleString(),
      },
      {
        field: "quantity",
        headerName: "No of People",
        sortable: false,
        hideable: false,
        flex: 0.5,
      },
      {
        field: "customer",
        headerName: "Customer Name",
        hideable: false,
        flex: 1,
        valueGetter: (value: { firstName: string; lastName: string }) =>
          `${value?.firstName} ${value?.lastName}`,
      },
      {
        field: "area",
        headerName: "Area",
        sortable: false,
        hideable: false,
        valueFormatter: (value: string) =>
          `${value?.charAt(0)}${value?.substring(1)?.toLowerCase()}`,
        flex: 0.5,
      },
      {
        field: "guestNotes",
        headerName: "Guest Notes",
        sortable: false,
        hideable: false,
        flex: 1,
        renderCell: (value: GridRenderCellParams) => (
          <Tooltip title={value?.value}>
            <Box
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {value?.value}
            </Box>
          </Tooltip>
        ),
      },
    ],
    []
  );

  useEffect(
    () =>
      setRows(
        reservationsList?.reservations as unknown as (typeof reservationsList)["reservations"]
      ),
    []
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: "calc(100vh - 64px - 56px)", // Adjusts for header and footer
        marginBottom: "64px", // Adjusts for footer height
      }}
    >
      <Stack flexDirection="column">
        <Typography variant="h4" gutterBottom marginBlock="16px">
          Welcome to the restaurant reservations!
        </Typography>
        {/* <Filters /> */}
        <DataGrid disableColumnMenu rows={rows} columns={columns} />
      </Stack>
    </Box>
  );
};

export default Content;

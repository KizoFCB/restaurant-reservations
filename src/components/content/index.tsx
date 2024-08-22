import React, { useCallback, useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Filters from "../filters";
import reservationsList from "../../services/serverResponse.json";

const Content: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

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

  const [filters, setFilters] = useState<{
    status: string;
    date: string;
    shift: string;
    area: string;
    name: string;
  }>({
    status: "",
    date: "",
    shift: "",
    area: "",
    name: "",
  });

  const handleFilterChange = useCallback((value: string, key: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      status: "",
      date: "",
      shift: "",
      area: "",
      name: "",
    });
  }, []);

  const findNameSplitSearch = useCallback(
    (
      searchValue: string,
      item: { customer: { firstName: string; lastName: string } }
    ) => {
      let found = false;

      const nameSplits = searchValue.split(" ");

      if (nameSplits?.length === 1) {
        found =
          item?.customer?.firstName
            .toLowerCase()
            .startsWith(searchValue?.toLowerCase()) ||
          item?.customer?.lastName
            .toLowerCase()
            .startsWith(searchValue?.toLowerCase());
      } else if (nameSplits?.length === 2) {
        found = `${item?.customer?.firstName} ${item?.customer?.lastName}`
          .toLowerCase()
          .startsWith(searchValue?.toLowerCase());
      }

      return found;
    },
    []
  );

  // Memoize the filtered data for efficiency
  const filteredRows = useMemo(() => {
    return rows?.filter((item) => {
      const matchesSearch = filters?.name
        ? findNameSplitSearch(filters?.name, item)
        : true;

      const matchesStatus = filters?.status
        ? item?.status === filters?.status
        : true;

      const matchesDate = filters?.date
        ? dayjs(item?.businessDate?.replace(".", "/"), "DD/MM/YYYY").isSame(
            dayjs(filters?.date),
            "day"
          )
        : true;

      const matchesShift = filters?.shift
        ? item?.shift === filters?.shift
        : true;

      const matchesArea = filters?.area ? item?.area === filters?.area : true;

      return (
        matchesStatus &&
        matchesShift &&
        matchesArea &&
        matchesSearch &&
        matchesDate
      );
    });
  }, [filters, rows]);

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
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
        />
        <DataGrid
          disableColumnMenu
          rows={filteredRows}
          columns={columns?.filter((column) => {
            if (
              column?.field === "id" ||
              column?.field === "businessDate" ||
              column?.field === "customer"
            ) {
              return true;
            }
            return !isMd;
          })}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Content;

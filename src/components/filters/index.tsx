import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface IFiltersProps {
  filters: {
    status: string;
    date: string;
    shift: string;
    area: string;
    name: string;
  };
  handleFilterChange: (value: string, key: string) => void;
}

const Filters = ({ filters, handleFilterChange }: IFiltersProps) => {
  return (
    <Stack flexDirection="row" gap="24px" marginBlock="32px">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label-status">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label-status"
            id="demo-simple-select-status"
            value={filters?.status}
            label="Status"
            onChange={(event) =>
              handleFilterChange(event?.target?.value, "status")
            }
          >
            <MenuItem value="CONFIRMED">Confirmed</MenuItem>
            <MenuItem value="SEATED">Seated</MenuItem>
            <MenuItem value="CHECKED OUT">Checked Out</MenuItem>
            <MenuItem value="NOT CONFIRMED">Not Confirmed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Reservation Date"
          value={filters?.date ? dayjs(filters?.date) : null}
          onChange={(value) =>
            handleFilterChange(value?.toString() || "", "date")
          }
        />
      </LocalizationProvider>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label-shift">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-label-shift"
            id="demo-simple-select-shift"
            value={filters?.shift}
            label="Shift"
            onChange={(event) =>
              handleFilterChange(event?.target?.value, "shift")
            }
          >
            <MenuItem value="BREAKFAST">Breakfast</MenuItem>
            <MenuItem value="LUNCH">Lunch</MenuItem>
            <MenuItem value="DINNER">Dinner</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label-area">Area</InputLabel>
          <Select
            labelId="demo-simple-select-label-area"
            id="demo-simple-select-area"
            value={filters?.area}
            label="Area"
            onChange={(event) =>
              handleFilterChange(event?.target?.value, "area")
            }
          >
            <MenuItem value="BAR">Bar</MenuItem>
            <MenuItem value="MAIN ROOM">Main Room</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        id="outlined-controlled"
        label="Guest Name or Surname"
        value={filters?.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleFilterChange(event.target.value, "name");
        }}
      />
    </Stack>
  );
};

export default Filters;

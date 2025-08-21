import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const GlobalFormComponent = ({ Data }) => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <FormGroup>
        {Data.body.map((e, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox disabled={e.checkBox} />}
            label={e.bodyTitle}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default GlobalFormComponent;
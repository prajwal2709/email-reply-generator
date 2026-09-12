
import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

function App() {

  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("Professional");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {

    setLoading(true);
    setReply("");

    try {

      const response = await fetch(
        "http://localhost:8080/api/email/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            emailcontent: emailContent,
            tone: tone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate reply");
      }

      const result = await response.text();

      setReply(result);

    } catch (error) {

      console.error("Error:", error);
      setReply("Something went wrong. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        py: 5,
      }}
    >

      <Container maxWidth="sm">

        {/* Main Card */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >

          {/* Heading */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: "#222222",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Email Reply Generator
          </Typography>


          {/* Email Input */}
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Email Content"
            placeholder="Paste or write the email here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{
              mb: 3,

              "& .MuiInputBase-root": {
                color: "#222222",
                backgroundColor: "#ffffff",
              },

              "& .MuiInputLabel-root": {
                color: "#555555",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#bbbbbb",
              },
            }}
          />


          {/* Tone Selection */}
          <FormControl
            fullWidth
            sx={{
              mb: 3,

              "& .MuiInputLabel-root": {
                color: "#555555",
              },

              "& .MuiSelect-select": {
                color: "#222222",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#bbbbbb",
              },
            }}
          >

            <InputLabel>Tone</InputLabel>

            <Select
              value={tone}
              label="Tone"
              onChange={(e) => setTone(e.target.value)}
            >

              <MenuItem value="Professional">
                Professional
              </MenuItem>

              <MenuItem value="Friendly">
                Friendly
              </MenuItem>

              <MenuItem value="Casual">
                Casual
              </MenuItem>

              <MenuItem value="Formal">
                Formal
              </MenuItem>

            </Select>

          </FormControl>


          {/* Generate Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleGenerate}
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Generating..." : "Generate Reply"}
          </Button>


          {/* Generated Reply */}
          {reply && (
            <TextField
              fullWidth
              multiline
              rows={8}
              label="Generated Reply"
              value={reply}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                mt: 3,

                "& .MuiInputBase-root": {
                  color: "#222222",
                  backgroundColor: "#ffffff",
                },

                "& .MuiInputLabel-root": {
                  color: "#555555",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#bbbbbb",
                },
              }}
            />
          )}

        </Box>

      </Container>

    </Box>
  );
}

export default App;

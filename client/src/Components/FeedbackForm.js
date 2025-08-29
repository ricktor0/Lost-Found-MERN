import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  Avatar,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Optionally send feedback to backend here
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%)" }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 6 },
          width: { xs: "98%", sm: 700 },
          borderRadius: 5,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: "#1976d2", width: 72, height: 72, mb: 1 }}>
            <MailOutlineIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#222"
            mb={1}
            align="center"
          >
            Feedback / Contact Us
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            align="center"
            mb={2}
          >
            We'd love to hear your thoughts, suggestions, or questions!
          </Typography>
          {submitted ? (
            <Typography
              color="success.main"
              align="center"
              fontSize={22}
              fontWeight={600}
              mt={2}
            >
              Thank you for your feedback!
            </Typography>
          ) : (
            <Box component="form" onSubmit={handleSubmit} width="100%">
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  name="name"
                  value={feedback.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="large"
                  InputProps={{ style: { fontSize: 20, padding: 18 } }}
                  InputLabelProps={{ style: { fontSize: 18 } }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={feedback.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  size="large"
                  InputProps={{ style: { fontSize: 20, padding: 18 } }}
                  InputLabelProps={{ style: { fontSize: 18 } }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={feedback.message}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  size="large"
                  InputProps={{ style: { fontSize: 20, padding: 18 } }}
                  InputLabelProps={{ style: { fontSize: 18 } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
                  }}
                  fullWidth
                >
                  SUBMIT
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default FeedbackForm;

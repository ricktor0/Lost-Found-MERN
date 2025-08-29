import React from "react";
import { Stack, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

// import image from "../img/earth.svg";

const Home = () => {
  const isLoggedIn = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/postitem");
    } else {
      navigate("/log-in");
    }
  };
  const handleButtonClickLost = () => {
    if (isLoggedIn) {
      navigate("/lostItems");
    } else {
      navigate("/log-in");
    }
  };
  const handleButtonClickFound = () => {
    if (isLoggedIn) {
      navigate("/founditems");
    } else {
      navigate("/log-in");
    }
  };
  const handleFeedbackClick = () => {
    navigate("/feedback");
  };

  return (
    <Stack width="100%" gap="100px" alignItems="center" pt="100px">
      <Stack
        width="100%"
        alignItems="center"
        position="relative"
        justifyContent="flex-start"
        height={{ xs: "auto", md: "520px" }}
        pt={{ xs: 2, md: 6 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          gap={10}
          maxWidth="1440px"
          py="20px"
        >
          <Stack
            width="100%"
            gap={3}
            px={{ xs: "40px", md: "0" }}
            pl={{ md: "40px" }}
          >
            <Typography
              variant="h1"
              fontWeight="bold"
              color="#357ABD"
              fontSize={{ xs: "3.5rem", sm: "5rem", md: "6rem", lg: "7rem" }}
              lineHeight={1.1}
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              Find your Item!
            </Typography>
            <img src="https://i.ibb.co/P1NQV2n/vector1.png" width="60%" />

            <Typography
              variant="subtitle1"
              color="#194067"
              fontSize={{ xs: "1.1rem", sm: "1.3rem", md: "1.5rem" }}
              fontWeight={500}
            >
              We know how hard it is to lose your item, that's why we want to
              help you!
            </Typography>
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleButtonClick}
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: { xs: "center", md: "auto" },
                  width: { xs: "200px", md: "auto" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "regular",
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Stack>
          <Stack width="100%" display={{ xs: "none", md: "flex" }}>
            <img src="https://i.ibb.co/9Z8qTQj/bg2.png" width="100%" />
          </Stack>
        </Stack>
      </Stack>

      {/* Feedback / Contact Us button removed, now in navbar */}
      <Stack
        direction="row"
        width="100%"
        justifyContent="center"
        sx={{ backgroundColor: "#357ABD" }}
        height={{ xs: "auto", md: "650px" }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          height="100%"
          width="100%"
          maxWidth="1440px"
          justifyContent="space-between"
          gap="30px"
        >
          <Stack
            pl="40px"
            py={{ xs: "20px", md: "0px" }}
            width={{ sx: "100%", md: "55%" }}
            sx={{
              alignSelf: "center",
              justifySelf: "end",
              maxWidth: "600px",
              gap: "30px",
            }}
          >
            <Typography
              color="#FEF0E9"
              variant="h1"
              fontWeight={700}
              fontSize={{ xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }}
            >
              About Us
            </Typography>
            <Typography
              color="#FEF0E9"
              fontSize={{ xs: "1.3rem", sm: "1.6rem", md: "2rem" }}
              fontWeight={500}
              mt={2}
            >
              Lost & Found helps you quickly report lost or found items and
              connect with others to return them. Together, we make it easier to
              bring lost things back home!
            </Typography>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <motion.div
                whileHover={{ scale: [null, 1.1, 1.1] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.8 }}
              >
                <Button
                  onClick={handleButtonClickLost}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#FEF0E9",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                >
                  <img src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png" />
                  Lost item
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: [null, 1.1, 1.1] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.8 }}
              >
                <Button
                  onClick={handleButtonClickFound}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "#FEF0E9",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                >
                  <img src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png" />
                  Found item
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: [null, 1.1, 1.1] }}
                transition={{ duration: 0.3 }}
                whileTap={{ scale: 0.8 }}
              >
                <Button
                  onClick={handleButtonClick}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#FEF0E9",
                    fontWeight: "700",
                    textTransform: "none",
                  }}
                >
                  <img src="https://i.ibb.co/5rKZCdX/Main-Logo-2.png" />
                  Post a lost item
                </Button>
              </motion.div>
            </Stack>
          </Stack>
          <Stack
            justifyContent="center"
            width={{ xs: "100%", md: "55%" }}
            height={{ xs: "400px", md: "100%" }}
            sx={{
              clipPath: {
                xs: "none",
                md: "circle(62.9% at 60% 50%)",
              },
              overflow: "hidden",
              backgroundImage:
                "url(https://www.yourzbs.com/wp-content/uploads/2019/06/The-Emotional-Side-Of-Returning-Lost-Objects.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;

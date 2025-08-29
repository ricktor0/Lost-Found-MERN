import { Paginationn } from "./MyListings";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FcAbout } from "react-icons/fc";
import { FcOvertime } from "react-icons/fc";

import { Link } from "react-router-dom";
import { setConstraint } from "../constraints";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
  IconButton,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Box,
} from "@mui/material";

export default function FoundItems() {
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [search, setSearch] = useState("");

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p style={{ fontSize: "1rem" }} className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };
  setConstraint(true);

  const [item, setitem] = useState("");
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/items",
      method: "GET",
    })
      .then((response) => {
        let allitems = response.data.items.reverse();
        // Filter by search
        if (search.trim() !== "") {
          const q = search.toLowerCase();
          allitems = allitems.filter(
            (item) =>
              item.type === "Found" &&
              (item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q))
          );
        } else {
          allitems = allitems.filter((item) => item.type === "Found");
        }
        const itemsPerPage = 9;
        const numItems = allitems.length;
        setMaxPages(Math.max(1, Math.ceil(numItems / itemsPerPage)));
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const data = allitems.slice(startIndex, endIndex);

        let items = [];
        data.forEach((item) => {
          let created_date = new Date(item.createdAt);
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          let user = false;
          if (item.userId === user_info._id) {
            user = true;
          }
          items.push(
            <motion.div
              whileHover={{ scale: [null, 1.05, 1.05] }}
              transition={{ duration: 0.4 }}
              key={item._id}
            >
              <Card
                sx={{
                  width: "270px",
                  height: "400px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "180px",
                    backgroundColor: "#9CC0DF",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 0,
                      display: "block",
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    borderRadius: "8px",
                    padding: "8px",
                    gap: "16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography
                    gutterBottom
                    fontSize="1.45rem"
                    component="div"
                    fontWeight={"bold"}
                    sx={{
                      textAlign: "left",
                      mt: 2,
                      mb: 0.5,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Stack
                    direction="row"
                    width="100%"
                    gap="10px"
                    alignItems="flex-start"
                    mb={1}
                  >
                    <FcAbout fontSize="25px" />
                    <Typography
                      fontSize={{
                        xs: "1.18rem",
                        sm: "1.25rem",
                        md: "1.32rem",
                      }}
                      color="black"
                      width="100%"
                      sx={{
                        textAlign: "left",
                        whiteSpace: "normal",
                        fontWeight: 500,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                  <Stack
                    pb="10px"
                    pt="6px"
                    direction="row"
                    width="100%"
                    gap="10px"
                    alignItems="center"
                  >
                    <FcOvertime fontSize="25px" />
                    <Typography
                      fontSize={{
                        xs: "1.13rem",
                        sm: "1.18rem",
                        md: "1.22rem",
                      }}
                      color="black"
                      sx={{ fontWeight: 500 }}
                    >
                      {createdAt}
                    </Typography>
                  </Stack>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      component={Link}
                      to={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
                      variant={"contained"}
                      color="primary"
                      sx={{
                        textTransform: "none",
                        width: "140px",
                        borderRadius: "8px",
                      }}
                    >
                      More Details
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        });
        setitem(items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
    // Reset to page 1 if search changes
    // eslint-disable-next-line
  }, [page, search]);

  return (
    <>
      {/* Search Bar at the very top */}
      <Stack direction="row" justifyContent="center" mt={4} mb={2}>
        <input
          type="text"
          placeholder="Search found items..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            width: "350px",
            padding: "10px 16px",
            fontSize: "1.1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            marginBottom: "10px",
          }}
        />
      </Stack>

      <Stack
        direction="row"
        width="100%"
        sx={{ backgroundColor: "primary.main" }}
        height="125px"
        gap="4px"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          spacing={0}
          position="relative"
          justifyContent="center"
          width="100%"
          maxWidth="1440px"
          height="125px"
          overflow="hidden"
          ml={{ xs: 3, sm: 5, md: 10 }}
        >
          <>
            <Typography
              fontSize={{ xs: "18px", sm: "22px", md: "25px" }}
              color="white"
              fontWeight=""
            >
              Welcome {user_info.nickname} 👋!
            </Typography>

            <Typography
              fontSize={{ xs: "17px", sm: "21px", md: "23px" }}
              color="white"
              fontWeight="bold"
            >
              Here you can find the Found Items
            </Typography>
          </>
        </Stack>
      </Stack>

      <Stack
        pt="20px"
        direction="row"
        justifyContent={"center"}
        flexWrap="wrap"
        gap="24px"
        maxWidth="1440px"
      >
        {item}
      </Stack>

      <Paginationn page={page} setPage={setPage} max={maxPages} />
    </>
  );
}

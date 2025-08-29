import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FcAbout } from "react-icons/fc";
import { FcOvertime } from "react-icons/fc";

import { Link } from "react-router-dom";
import { setConstraint } from "../constraints";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Pagination,
} from "@mui/material";
import Axios from "axios";

const Paginationn = ({ page, setPage, max }) => {
  const handleChange = (event, page) => {
    setPage(page);
  };

  return (
    <Pagination
      sx={{ pt: "80px" }}
      count={Math.ceil(max)}
      page={page}
      onChange={handleChange}
      showLastButton
      showFirstButton
    />
  );
};

export default function LostItems() {
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
    Axios({
      url: "https://lost-found-backend-qt0o.onrender.com/items",
      method: "GET",
    })
      .then((response) => {
        let allitems = response.data.items.reverse();
        // Filter by search
        if (search.trim() !== "") {
          const q = search.toLowerCase();
          allitems = allitems.filter(
            (item) =>
              item.type === "Lost" &&
              (item.name.toLowerCase().includes(q) ||
                item.description.toLowerCase().includes(q))
          );
        } else {
          allitems = allitems.filter((item) => item.type === "Lost");
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
                }}
              >
                <CardContent
                  sx={{
                    borderRadius: "8px",
                    padding: "8px",
                    gap: "16px",
                  }}
                >
                  <Stack
                    sx={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#232B3E",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Stack>
                  <Stack p="11px" gap="11px">
                    <Typography
                      noWrap
                      gutterBottom
                      fontSize="25px"
                      component="div"
                      fontWeight={"bold"}
                      m="0"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "16px",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" width="100%" gap="15px">
                    <FcAbout fontSize="25px" />
                    <Typography
                      noWrap
                      fontSize="16px"
                      color="black"
                      width="100%"
                    >
                      {item.description.toString().slice(0, 30)} ...
                    </Typography>
                  </Stack>
                  <Stack
                    pb="19px"
                    pt="11px"
                    direction="row"
                    width="100%"
                    gap="15px"
                  >
                    <FcOvertime fontSize="25px" />
                    <Typography ml="5px" noWrap fontSize="16px" color="black">
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
          placeholder="Search lost items..."
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
              Here you can find the Lost Items
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

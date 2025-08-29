import React, { useState, useEffect } from "react";
import { LOGGED_IN, setConstraint } from "../constraints";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal, Button, Typography, Avatar, Stack, Box } from "@mui/material";
import { Carousel } from "react-carousel-minimal";
import { MdDateRange } from "react-icons/md";
import { GrMap } from "react-icons/gr";

function ItemPage() {
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState(null);
  // Add claim state
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSent, setClaimSent] = useState(false);
  // Get user from localStorage
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [item, setItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [loading, setloading] = useState(false);
  const [slides, setSlides] = useState([]);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  const handleShow = () => setShow(true);

  setConstraint(true);
  const queryParams = new URLSearchParams(window.location.search);

  const item_id = queryParams.get("cid");

  const current_user = queryParams.get("type").split("/")[1];

  console.log(current_user);

  useEffect(() => {
    setloading(true);
    axios({
      url: `https://lost-found-backend-qt0o.onrender.com/items/${item_id}`,
      method: "GET",
    })
      .then((response) => {
        const data = response.data.item;
        if (!data) {
          setItemDetails(
            <Typography color="error">Item not found.</Typography>
          );
          setloading(false);
          return;
        }
        let slides = Array.isArray(data.img)
          ? data.img.map((item) => ({ image: item }))
          : [];
        setItem(response.data.item);
        let created_date = data.createdAt ? new Date(data.createdAt) : null;
        let createdAt = created_date
          ? created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes()
          : "N/A";
        const itemDetails = (
          <>
            <Stack
              width="100%"
              px={{ xs: 2, sm: 5, md: 10 }}
              gap="30px"
              marginTop="20px"
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                width="100%"
                justifyContent="space-evenly"
                alignItems="center"
                gap={{ xs: "0px", sm: "15px" }}
              >
                <Stack
                  width={{ xs: "100%", sm: "50%", md: "750px" }}
                  height="280px"
                  mt="10px"
                >
                  {slides.length > 0 ? (
                    <Carousel
                      data={slides}
                      width={{ xs: "100%", sm: "50%", md: "750px" }}
                      height="270px"
                      radius="10px"
                      dots={false}
                      automatic={false}
                      slideBackgroundColor="#dbdbdb"
                      slideImageFit="contain"
                      thumbnails={false}
                      thumbnailWidth="100px"
                    />
                  ) : (
                    <Typography color="text.secondary">
                      No images available.
                    </Typography>
                  )}
                </Stack>
                <Stack
                  justifyContent="center"
                  width={{ xs: "100%", sm: "50%", md: "400px" }}
                  p="15px"
                  sx={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                  }}
                  gap="10px"
                >
                  <Stack
                    direction="row"
                    width="100%"
                    border="solid 3px"
                    borderRadius="10px"
                    sx={{ borderColor: "primary.main" }}
                    gap="10px"
                    alignItems="center"
                    justifyContent="center"
                    p="10px"
                  >
                    <Stack
                      width={{ md: "40%", xs: "100%" }}
                      alignItems="center"
                    >
                      <Avatar
                        src={data?.userId?.img}
                        sx={{
                          width: { xs: 80, sm: 95, md: 110 },
                          height: { xs: 80, sm: 95, md: 110 },
                        }}
                      />
                    </Stack>
                    <Stack width={{ md: "60%", xs: "100%" }}>
                      <Typography
                        fontSize={{ xs: "20px", sm: "25px" }}
                        component="div"
                        fontWeight={"bold"}
                        mx={{ xs: "0", md: "auto" }}
                        color={"primary"}
                      >
                        {data?.userId?.fullname || "Unknown User"}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography fontSize="18px" fontWeight="bold">
                    Description:
                  </Typography>
                  <Typography
                    fontSize="16px"
                    sx={{ textAlign: "left", lineHeight: 1.7, ml: 0, pl: 0 }}
                  >
                    {data.description || (
                      <span style={{ color: "#888" }}>
                        No description provided.
                      </span>
                    )}
                  </Typography>
                </Stack>
              </Stack>
              <Stack width="100%" px={{ xs: 3, sm: 5, md: 10 }} gap="15px">
                <Stack width="100%" mt="30px">
                  <Stack
                    width="100%"
                    height="3px"
                    backgroundColor={"primary.main"}
                  />
                  <Stack
                    width="100%"
                    direction="row"
                    height="60px"
                    alignItems="center"
                    gap="15px"
                  >
                    <Stack
                      justifyContent="flex-end"
                      direction="row"
                      width="49%"
                      gap="8px"
                    >
                      <MdDateRange fontSize="20px" />
                      <Typography fontSize="15px" fontWeight="bold">
                        Date Found:
                      </Typography>
                    </Stack>
                    <Stack
                      width="3px"
                      height="80%"
                      backgroundColor={"primary.main"}
                    />
                    <Stack
                      justifyContent="flex-start"
                      direction="row"
                      width="49%"
                    >
                      <Typography fontSize="15px">
                        {data?.date || createdAt}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    width="100%"
                    height="3px"
                    backgroundColor={"primary.main"}
                  />
                  <Stack
                    width="100%"
                    direction="row"
                    minHeight="60px"
                    alignItems="center"
                    gap="15px"
                  >
                    <Stack
                      justifyContent="flex-end"
                      direction="row"
                      width="49%"
                      gap="8px"
                    >
                      <GrMap fontSize="20px" />
                      <Typography fontSize="15px" fontWeight="bold">
                        Location Found:
                      </Typography>
                    </Stack>
                    <Stack
                      width="3px"
                      height="80%"
                      backgroundColor={"primary.main"}
                    />
                    <Stack
                      py="15px"
                      justifyContent="flex-start"
                      direction="row"
                      width="49%"
                    >
                      <Typography fontSize="15px">
                        {data?.location || (
                          <span style={{ color: "#888" }}>
                            No location provided.
                          </span>
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    width="100%"
                    height="3px"
                    backgroundColor={"primary.main"}
                  />
                </Stack>
              </Stack>
            </Stack>
          </>
        );
        setItemDetails(itemDetails);
        setloading(false);
      })
      .catch((err) => {
        setItemDetails(
          <Typography color="error">Failed to load item details.</Typography>
        );
        setloading(false);
        console.log("Error :", err);
      });
  }, []);

  const delete_item = () => {
    console.log("deleted");
    axios({
      url: `https://lost-found-backend-qt0o.onrender.com/items/delete/${item_id}`,
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        handleCloseDelete();
        toast.success("Item kicked to 🗑️ successfully!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.href = "/mylistings";
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  return (
    <>
      {loading ? (
        <Typography>Loading item details...</Typography>
      ) : (
        <>
          <Stack width="100%" alignItems="center" pt="10px">
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
                <Typography
                  fontSize={{ xs: "18px", sm: "22px", md: "25px" }}
                  color="white"
                  fontWeight=""
                >
                  {`${item?.type || ""} Item`}
                </Typography>
                <Typography
                  fontSize={{ xs: "17px", sm: "21px", md: "23px" }}
                  color="white"
                  fontWeight="bold"
                >
                  {item ? `Someone Found ${item?.name}` : ""}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "1440px",
              }}
            >
              {itemDetails}
              {/* Claim Button for non-owners */}
              {user && item && user._id !== item.userId._id && !claimSent && (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={claimLoading}
                  sx={{ mt: 2, borderRadius: "8px" }}
                  onClick={async () => {
                    setClaimLoading(true);
                    try {
                      await axios.post(
                        "https://lost-found-backend-qt0o.onrender.com/items/claim-request",
                        { itemId: item._id },
                        {
                          headers: {
                            token: window.localStorage.getItem("token"),
                          },
                        }
                      );
                      toast.success("Claim request sent!", {
                        position: "bottom-right",
                      });
                      setClaimSent(true);
                    } catch (e) {
                      let msg = "Could not send claim request.";
                      if (
                        e.response &&
                        e.response.data &&
                        e.response.data.error
                      ) {
                        msg += ` (${e.response.data.error})`;
                      }
                      toast.error(msg, { position: "bottom-right" });
                    }
                    setClaimLoading(false);
                  }}
                >
                  {claimLoading ? "Sending..." : "Claim Item"}
                </Button>
              )}

              {/* Show claim status for non-owner user */}
              {user &&
                item &&
                user._id !== item.userId._id &&
                Array.isArray(item.claimRequests) &&
                (() => {
                  const myClaim = item.claimRequests.find(
                    (r) => (r.userId._id || r.userId) === user._id
                  );
                  if (!myClaim) return null;
                  if (myClaim.status === "pending") {
                    return (
                      <Typography color="primary" sx={{ mt: 2 }}>
                        Claim request sent! Please wait for the owner to
                        respond.
                      </Typography>
                    );
                  }
                  if (myClaim.status === "accepted") {
                    return (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mt: 2, borderRadius: "8px" }}
                          onClick={() => {
                            setOwnerInfo({
                              name:
                                item.userId.fullname ||
                                item.userId.nickname ||
                                "",
                              email: item.userId.email,
                              number:
                                item.userId.number || item.number || "N/A",
                            });
                            setShowOwnerModal(true);
                          }}
                        >
                          Show Owner Info
                        </Button>
                        <Modal
                          open={showOwnerModal}
                          onClose={() => setShowOwnerModal(false)}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              bgcolor: "background.paper",
                              boxShadow: 24,
                              p: 4,
                              borderRadius: 2,
                              minWidth: 300,
                            }}
                          >
                            <Typography variant="h6" mb={2}>
                              Owner Contact Info
                            </Typography>
                            <Typography>Name: {ownerInfo?.name}</Typography>
                            <Typography>Email: {ownerInfo?.email}</Typography>
                            <Typography>Phone: {ownerInfo?.number}</Typography>
                            <Button
                              sx={{ mt: 2 }}
                              variant="contained"
                              onClick={() => setShowOwnerModal(false)}
                            >
                              Close
                            </Button>
                          </Box>
                        </Modal>
                        <Typography color="success.main" sx={{ mt: 2 }}>
                          Claim Accepted!
                        </Typography>
                      </>
                    );
                  }
                  if (myClaim.status === "declined") {
                    return (
                      <Typography color="error" sx={{ mt: 2 }}>
                        Claim Declined
                      </Typography>
                    );
                  }
                  return null;
                })()}
              {claimSent && (
                <Typography color="primary" sx={{ mt: 2 }}>
                  Claim request sent! Please wait for the owner to respond.
                </Typography>
              )}

              {/* Show claim requests to owner */}
              {user && item && user._id === item.userId._id && (
                <>
                  {/* Claim Requests Section */}
                  {Array.isArray(item.claimRequests) &&
                    item.claimRequests.length > 0 && (
                      <Stack mt={2} mb={2}>
                        <Typography fontWeight="bold" color="primary">
                          Claim Requests:
                        </Typography>
                        {item.claimRequests.map((req, idx) => (
                          <Stack
                            key={idx}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            mb={1}
                          >
                            <Typography fontSize="14px" color="text.secondary">
                              {req.userId && typeof req.userId === "object"
                                ? `${
                                    req.userId.fullname ||
                                    req.userId.nickname ||
                                    req.userId.email
                                  } (${req.userId.email})`
                                : `User ID: ${req.userId}`}
                              {req.createdAt
                                ? ` at ${new Date(
                                    req.createdAt
                                  ).toLocaleString()}`
                                : ""}
                            </Typography>
                            {/* Show Accept/Decline for pending, show status for accepted/declined */}
                            {req.status === "pending" ? (
                              <>
                                <Button
                                  size="small"
                                  color="success"
                                  variant="contained"
                                  sx={{ minWidth: 0, px: 1, fontSize: 12 }}
                                  onClick={async () => {
                                    try {
                                      await axios.post(
                                        `https://lost-found-backend-qt0o.onrender.com/items/claim-request/accept`,
                                        {
                                          itemId: item._id,
                                          userId: req.userId._id || req.userId,
                                        },
                                        {
                                          headers: {
                                            token:
                                              window.localStorage.getItem(
                                                "token"
                                              ),
                                          },
                                        }
                                      );
                                      toast.success("Claim accepted!");
                                      window.location.reload();
                                    } catch (e) {
                                      toast.error("Failed to accept claim");
                                    }
                                  }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                  sx={{ minWidth: 0, px: 1, fontSize: 12 }}
                                  onClick={async () => {
                                    try {
                                      await axios.post(
                                        `https://lost-found-backend-qt0o.onrender.com/items/claim-request/decline`,
                                        {
                                          itemId: item._id,
                                          userId: req.userId._id || req.userId,
                                        },
                                        {
                                          headers: {
                                            token:
                                              window.localStorage.getItem(
                                                "token"
                                              ),
                                          },
                                        }
                                      );
                                      toast.info("Claim declined.");
                                      window.location.reload();
                                    } catch (e) {
                                      toast.error("Failed to decline claim");
                                    }
                                  }}
                                >
                                  Decline
                                </Button>
                              </>
                            ) : req.status === "accepted" ? (
                              <Typography
                                fontWeight="bold"
                                color="success.main"
                                ml={1}
                              >
                                Accepted
                              </Typography>
                            ) : req.status === "declined" ? (
                              <Typography
                                fontWeight="bold"
                                color="error"
                                ml={1}
                              >
                                Declined
                              </Typography>
                            ) : null}
                          </Stack>
                        ))}
                      </Stack>
                    )}
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 2, borderRadius: "8px" }}
                    onClick={handleShowDelete}
                  >
                    Delete Post
                  </Button>
                  <Modal
                    open={showDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="delete-modal-title"
                    aria-describedby="delete-modal-description"
                  >
                    <Stack
                      spacing={2}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        minWidth: 300,
                      }}
                    >
                      <Typography
                        id="delete-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Confirm Delete
                      </Typography>
                      <Typography id="delete-modal-description">
                        Are you sure you want to delete this post? This action
                        cannot be undone.
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                      >
                        <Button
                          onClick={handleCloseDelete}
                          color="primary"
                          variant="outlined"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={delete_item}
                          color="error"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Modal>
                </>
              )}
            </Stack>
          </Stack>
          {/* ...existing modals code... */}
        </>
      )}
    </>
  );
}

export default ItemPage;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RedirectionModal from "./redirectionModal";
import { useDispatch, useSelector } from "react-redux";
import { initializeSignUpState } from "../../redux/signup/SignupActions";
import { Box, Grid, Menu, MenuItem, Badge } from "@mui/material";
import SvgIconFromPublic from "../atomicComponents/svgIcon";
import CONSTANTS from "../../utils/constants/CONSTANTS";
import navbarData from "../../utils/constants/JSON/homeNavbarLinks.json";
import { setSelectedRoute } from "../../redux/main/mainActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeQueryParamTrigger = queryParams.get("type");

  const userDetails = useSelector((state: any) => state.signup.userDetails);
  const guestDetails = useSelector((state: any) => state.signup.guestDetails);

  const selectedRoute = useSelector((state: any) => state.main.selectedRoute);
  const cartCount = useSelector((state: any) =>
    state.cart.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [redirectionLink, setRedirectionLink] = useState("");
  const isFaceScanPresent = userDetails.isBodyScanned;
  const isBodyScanPresent = userDetails.isBodyScanned;
  const isGuestFaceScanPresent = guestDetails.isFaceScanned;
  const isGuestBodyScanPresent = guestDetails.isBodyScanned;
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const anchorTagStyling =
    "no-underline m-0 p-0 font-Montserrat font-bold max-sm:hidden max-md:text-xs text-sm cursor-pointer";

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClick = (event: any) => {
    setMobileAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(initializeSignUpState());

     Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith("recommendedColors_")) {
        localStorage.removeItem(key); // Clear all keys except recommended colors
      }
    });

    // localStorage.clear();
    sessionStorage.clear();
    navigate("/");
    handleClose();
  };
  const handleAccountManagement = () => {
    // Add your account management logic here
    handleClose();
  };

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const queryParams = window.location?.search;
    if (queryParams) {
      const urlParams = new URLSearchParams(queryParams);
      const type = urlParams.get("type");
      if (type) {
        const matchingItem = navbarData.find((item) => item.name === type);
        dispatch(setSelectedRoute(matchingItem || navbarData[0]));
      }
    } else {
      const matchingItem = navbarData.find((item) => item.link === currentUrl);
      dispatch(setSelectedRoute(matchingItem || navbarData[0]));
    }
  }, [dispatch]);
  useEffect(() => {
    // TODO: Need to remove hardcoded value from here
    if (
      typeQueryParamTrigger === "Apparel" ||
      typeQueryParamTrigger === "Cosmetics"
    ) {
      dispatch(
        setSelectedRoute({
          name: typeQueryParamTrigger,
          link: `/home/suggestion?type=${typeQueryParamTrigger}`,
          type: "link",
        })
      );
    }
  }, [dispatch, typeQueryParamTrigger, location]);

  return (
    <Grid
      item
      container
      className="bg-gray-100 rounded-lg py-4 px-8 flex flex-col gap-5 mb-2 w-full"
    >
      {/* Navbar Top Row */}
      <Grid item container className="flex justify-between items-center">
        <img
          className="w-8 h-8 cursor-pointer"
          src="/assets/images/logo.png"
          alt="logo"
          onClick={() => {
            dispatch(setSelectedRoute(navbarData[0]));
            navigate("/home");
          }}
        />
        <Grid item className="flex gap-4 items-center">
          <Box className="bg-gray-100 rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center max-sm:hidden">
            <SvgIconFromPublic
              src={`${process.env.PUBLIC_URL}/assets/icons/svg/favourite.svg`}
              className="w-4 h-4"
            />
          </Box>
          {/* Cart Icon with Badge */}
          <Box className="bg-gray-100 rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center cursor-pointer" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartCount} color="secondary" showZero>
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </Box>
          <Box
            className="bg-gray-100 rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center cursor-pointer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <SvgIconFromPublic
              src={`${process.env.PUBLIC_URL}/assets/icons/svg/person.svg`}
              className="w-5 h-5"
            />
          </Box>
          <Box
            className="sm:hidden bg-white rounded-full p-1 w-5 h-5 shadow-xl flex items-center justify-center cursor-pointer"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuClick}
          >
            <SvgIconFromPublic
              src={`${process.env.PUBLIC_URL}/assets/icons/svg/hamburger.svg`}
              className="w-5 h-5"
            />
          </Box>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccountManagement}>
              Account Management
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
          <Menu
            id="menu"
            anchorEl={mobileAnchorEl}
            keepMounted
            open={Boolean(mobileAnchorEl)}
            onClose={handleMobileMenuClose}
          >
            {navbarData?.map((item: any) => {
              return (
                <MenuItem
                  onClick={() => {
                    dispatch(setSelectedRoute(item));
                    if (
                      item.name === "Apparel" &&
                      !(isBodyScanPresent || isGuestBodyScanPresent)
                    ) {
                      setModalOpen(true);
                      setRedirectionLink(CONSTANTS.SIGN_UP_BODY_SCANNING);
                      return;
                    }
                    if (
                      item.name === "Cosmetics" &&
                      !(isFaceScanPresent || isGuestFaceScanPresent)
                    ) {
                      // alert("tr");
                      setModalOpen(true);
                      setRedirectionLink(CONSTANTS.SIGN_UP_BODY_SCANNING);
                      return;
                    }

                    navigate(item.link);
                  }}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Menu>
        </Grid>
      </Grid>
      {/* Horizontal Line */}
      <div className="bg-gray-200 w-full h-[2px] rounded-full max-sm:hidden"></div>
      {/* Options */}
      <Grid item container className="flex justify-between max-sm:hidden">
        {navbarData?.map((item: any) => {
          return (
            <a
              className={`${anchorTagStyling} ${
                selectedRoute?.name === item.name
                  ? "text-primaryDark"
                  : "text-gray-300"
              }`}
              onClick={() => {
                dispatch(setSelectedRoute(item));
                if (
                  item.name === "Apparel" &&
                  !(isBodyScanPresent || isGuestBodyScanPresent)
                ) {
                  setModalOpen(true);
                  setRedirectionLink(CONSTANTS.SIGN_UP_BODY_SCANNING);
                  return;
                }
                if (
                  item.name === "Cosmetics" &&
                  !(isFaceScanPresent || isGuestFaceScanPresent)
                ) {
                  setModalOpen(true);
                  setRedirectionLink(CONSTANTS.SIGN_UP_BODY_SCANNING);
                  return;
                }
                navigate(item.link);
              }}
            >
              {item.name}
            </a>
          );
        })}
      </Grid>
      <RedirectionModal
        open={modalOpen}
        setOpen={setModalOpen}
        redirection={redirectionLink}
      />
    </Grid>
  );
};

export default HomeNavbar;

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import * as images from "../../../assets/images";

export const AlgoList = () => {
  return (
    <ImageList
      sx={{
        width: "80%",
        height: "auto",
        margin: "auto",
        overflowY: "hidden",
        backgroundColor: "#f5f5f5",
        borderRadius: "20px", // Optional: Adds rounded corners
        padding: "50px", // Optional: Adds some space inside the container
      }}
      variant="quilted"
      cols={5}
      rowHeight={164}
    >
      {itemData.map((item, index) => (
        <ImageListItem key={item.img}>
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <ImageListItemBar
              title={item.title}
              position="below"
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                color: "black",
                fontFamily: '"Roboto", sans-serif', // Custom font
                fontSize: "1.2rem", // Larger font size
                fontWeight: "bold", // Bold font weight
                textAlign: "center", // Center align text
              }}
            />
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export const Paths = {
  HOME: "/",
  ABOUT: "/about",
  ALGORITHM: "/algorithm",
  HEAP: "/algorithm/heap",
  DIJKSTRA: "/algorithm/dijkstra",
  HASH: "/algorithm/hash",
  BST: "/algorithm/bst",
};

const itemData = [
  {
    img: images.Bellman,
    title: "Bellman",
    path: Paths.ALGORITHM,
    // path of bellman go to algotirthm now
  },
  {
    img: images.BST,
    title: "BST",
    path: Paths.BST,
  },
  {
    img: images.Dijkstra,
    title: "Dijkstra",
    path: Paths.DIJKSTRA,
  },
  {
    img: images.Hash,
    title: "Hash",
    path: Paths.HASH,
  },
  {
    img: images.Heaps,
    title: "Heaps",
    path: Paths.HEAP,
  },
];

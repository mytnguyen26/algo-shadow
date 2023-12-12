import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";
import * as images from "../../assets/images";
import { Email } from "@mui/icons-material";
import Button from "@mui/material/Button";

const members = [
  {
    name: "My Nguyen​",
    role: "Product Manager​",
    bio: "I created the product roadmap, implemented developer workflow and ensure product quality.​",
    imageUrl: images.MY,
    email: "mytng@bu.edu",
  },
  {
    name: "Fengyun​",
    role: "UI/UX​",
    bio: "I created UI design, and implement our Web UI to make sure our customers have an seamless and comprehensive experience.",
    imageUrl: images.Fengyun,
    email: "fchen12@bu.edu",
  },
  {
    name: "Xinyue",
    role: "Full Stack Engineer​​",
    bio: "I selected the web framework for our app, and implemented our Web UI. Also, I implemented Dijkstra algorithm.​",
    imageUrl: images.Xinyue,
    email: "xinyuec57@gmail.com",
  },
  {
    name: "Junyi​",
    role: "Full Stack Engineer​​",
    bio: "I contributed to the development of the Hash and Bellman algorithms, ensuring their effective implementation and optimal performance.​",
    imageUrl: images.Junyi,
    email: "tobymjy@gmail.com",
  },
  {
    name: "Yutong",
    role: "Full Stack Engineer​​",
    bio: "I contributed to the development of the Heap and BST algorithms, ensuring their effective implementation and optimal performance.​",
    imageUrl: images.Yutong,
    email: "fyutong@bu.edu",
  },
];

const AboutPage = () => {
  return (
    <Box padding={3}>
      <Typography variant="h3" marginBottom={3}>
        About Us
      </Typography>

      {members.map((member, index) => (
        <Box key={index} marginBottom={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={member.imageUrl}
              alt={member.name}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="h5">{member.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {member.role}
              </Typography>
              <Typography variant="body1" marginTop={1}>
                {member.bio}
              </Typography>
              <Typography
                variant="body1"
                marginTop={1}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Tooltip title={member.email}>
                  <Button href={`mailto:${member.email}`} type="email">
                    <Email href={member.email} />
                  </Button>
                </Tooltip>
                {member.email}
              </Typography>
            </Box>
          </Stack>
          {index < members.length - 1 && <Divider sx={{ marginTop: 3 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default AboutPage;

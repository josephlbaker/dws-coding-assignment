"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import { useTheme } from "@mui/material/styles";

export default function AboutPage() {
  const theme = useTheme();

  const socialLinks = [
    {
      label: "GitHub",
      url: "https://github.com/josephlbaker",
      icon: <GitHubIcon />,
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/joelucasbaker",
      icon: <LinkedInIcon />,
    },
    {
      label: "Website",
      url: "https://www.joelucasbaker.com",
      icon: <LanguageIcon />,
    },
  ];

  const toolsUsed = [
    {
      label: "React",
      description: "A JavaScript library for building user interfaces",
      icon: <CodeIcon />,
    },
    {
      label: "Next.js",
      description: "The React Framework for Production",
      icon: <CodeIcon />,
    },
    {
      label: "Material UI",
      description: "React components for faster and easier web development",
      icon: <BuildIcon />,
    },
    {
      label: "Recharts",
      description: "A composable charting library built on React components",
      icon: <BuildIcon />,
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About This App
      </Typography>

      {/* Social Links */}
      <Typography variant="h5" component="h2" gutterBottom>
        Connect with Me
      </Typography>
      <Grid container spacing={2}>
        {socialLinks.map((link, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card elevation={3}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    marginRight: 2,
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  {link.icon}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    {link.label}
                  </Typography>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    variant="h6"
                  >
                    {link.url}
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tools Used */}
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ marginTop: 4 }}
      >
        Tools and Technologies
      </Typography>
      <Grid container spacing={2}>
        {toolsUsed.map((tool, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card elevation={3}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    marginRight: 2,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  {tool.icon}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" color="textSecondary">
                    {tool.label}
                  </Typography>
                  <Typography variant="body2">{tool.description}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

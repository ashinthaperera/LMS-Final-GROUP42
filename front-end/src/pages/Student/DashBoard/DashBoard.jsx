import React from "react";
import { Grid } from "@mui/material";
import Tile from "../../../components/Dashboard/Tile";

const DashboardData = [
  {
    id: "1",
    name: "Ai",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Learn the wonders of mathematics.",
    navLink: "/student/module",
  },
  {
    id: "2",
    name: "Fullstack",
    image:
      "https://img.freepik.com/free-vector/futuristic-science-lab-background_23-2148505015.jpg?w=2000&t=st=1703658366~exp=1703658966~hmac=590c7d3fa10d6e3e25c68b62ba719f38f20d92de5edf88c04ab06d0ff5c3cdd0",
    description: "Explore the fascinating world of science.",
    navLink: "/student/module",
  },
  {
    id: "3",
    name: "Database",
    image:
      "https://img.freepik.com/free-photo/elevated-view-magnifying-glass-burnt-paper-knife-map_23-2147837103.jpg?w=2000&t=st=1703658391~exp=1703658991~hmac=d2f30f5a287776b3c5ff5e508f48f80b8ec6d5ebfc24a0fb8bed3b656d9eb457",
    description: "Uncover the stories of the past.",
    navLink: "/student/module",
  },
  {
    id: "4",
    name: "Mobile app",
    image:
      "https://img.freepik.com/free-photo/finance-economics-work-male-discussion-laptop_1418-79.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Explore the world of Finance.",
    navLink: "/student/module",
  },
];

const Dashboard = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {DashboardData.map((subject) => (
        <Grid item key={subject.id} xs={12} sm={6} md={4} lg={3}>
          <Tile
            title={subject.name}
            image={subject.image}
            description={subject.description}
            linkTo={subject.navLink}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;

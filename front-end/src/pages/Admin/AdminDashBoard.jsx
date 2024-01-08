import React from "react";
import { Grid } from "@mui/material";
import Tile from "../../components/Dashboard/Tile";

const moduleData = [
  {
    id: "1",
    name: "View Students",
    image:
      "https://img.freepik.com/free-vector/futuristic-science-lab-background_23-2148505015.jpg?w=2000&t=st=1703658366~exp=1703658966~hmac=590c7d3fa10d6e3e25c68b62ba719f38f20d92de5edf88c04ab06d0ff5c3cdd0",
    description: "Description for Module 1",
    navLink: "/admin/student",
  },

  {
    id: "2",
    name: "View Lecturers",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/admin/lecturer",
  },

  {
    id: "3",
    name: "View Modules",
    image:
    "https://img.freepik.com/free-photo/finance-economics-work-male-discussion-laptop_1418-79.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/admin/module",
  },

  // Add more modules as needed
];
const AdminDash = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {moduleData.map((subject) => (
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

export default AdminDash;

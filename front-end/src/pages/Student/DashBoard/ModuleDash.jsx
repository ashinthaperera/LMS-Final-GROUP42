import React from "react";
import { Grid } from "@mui/material";
import Tile from "../../../components/Dashboard/Tile";

const moduleData = [
  {
    id: "1",
    name: "View Lecturer Materials",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/file/view",
  },

  {
    id: "2",
    name: "View Module submission",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/modulefile/view",
  },

  {
    id: "3",
    name: "Add Student Submission",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/studentfile",
  },

  // Add more modules as needed
];
const ModuleDash = () => {
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

export default ModuleDash;

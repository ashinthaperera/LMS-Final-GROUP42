import React from "react";
import { Grid } from "@mui/material";
import Tile from "../../../components/Dashboard/Tile";

const moduleData = [
  {
    id: "1",
    name: "Add Lecturer Materials",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/file/",
  },

  {
    id: "2",
    name: "Add Module submission",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/modulefile/",
  },

  {
    id: "3",
    name: "View Student Submission",
    image:
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?size=626&ext=jpg&ga=GA1.1.1599894178.1703658316&semt=sph",
    description: "Description for Module 1",
    navLink: "/studentfile/view",
  },

  // Add more modules as needed
];
const LecModuleDash = () => {
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

export default LecModuleDash;

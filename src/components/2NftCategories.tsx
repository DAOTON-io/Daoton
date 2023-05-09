import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import ForumIcon from "@mui/icons-material/Forum";
import GavelIcon from "@mui/icons-material/Gavel";
import PixIcon from "@mui/icons-material/Pix";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { makeStyles } from "@mui/styles";
import { Box, Card, CardActionArea, CardContent, Grid, Theme, Typography } from "@mui/material";
import { CategoryType } from "../utils/types";

const categories: CategoryType[] = [
  {
    id: 1,
    label: "create nft",
    icon: <BusinessIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" />,
  },
  {
    id: 2,
    label: "create collection",
    icon: <AssuredWorkloadIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" />,
  },
];

type Props = {
  activeStepOnChange: (activeStep: number) => void;
  selectedCategoryOnChange: (selectedCategory: CategoryType) => void;
  selectedCategory: CategoryType;
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundImage: "url('/images/bluebg2.jpg') !important",
    backgroundSize: "cover",
  },
  cardSelected: {
    backgroundColor: "#EC7D31 !important",
    backgroundSize: "cover",
  },
  cardItem: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    height: "5rem",
  },
}));

export const NFTCategories: React.FC<Props> = ({ activeStepOnChange, selectedCategoryOnChange, selectedCategory }) => {
  const classes = useStyles();

  return (
    <div style={{width:'100%'}}>
      <Grid container spacing={2}>
        {categories.map((category) => {
          if (category.id === selectedCategory.id) {
            return (
              <Grid item xs={12} sm={6} key={category.id.toString()}>
                <Card
                  id={category.id.toString()}
                  className={classes.cardSelected}
                  onClick={() => {
                    activeStepOnChange(2);
                    selectedCategoryOnChange(category);
                  }}
                  key={category.id.toString()}
                >
                  <CardActionArea key={category.id.toString()}>
                    <CardContent className={classes.cardItem} key={category.id.toString()}>
                      {category.icon}
                      <Typography color={"white"} fontSize={30} gutterBottom variant="h5" component="div">
                        {category.label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          }
          return (
            <Grid item xs={12} sm={6} key={category.id.toString()}>
              <Box>
                <Card
                  id={category.id.toString()}
                  className={classes.card}
                  onClick={() => {
                    activeStepOnChange(2);
                    selectedCategoryOnChange(category);
                  }}
                  key={category.id.toString()}
                >
                  <CardActionArea key={category.id.toString()}>
                    <CardContent className={classes.cardItem} key={category.id.toString()}>
                      {category.icon}
                      <Typography color={"white"} fontSize={30} gutterBottom variant="h5" component="div">
                        {category.label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

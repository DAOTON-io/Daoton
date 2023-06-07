import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { makeStyles } from "@mui/styles";
import { Box, Card, CardActionArea, CardContent, Grid, Theme, Typography } from "@mui/material";
import { Category } from "../utils/types";

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
    alignItems: "center",
    justifyContent: "center",
    height: "5rem",
  },
}));

const categories: Category[] = [
  {
    id: 1,
    label: "Generate Your NFT",
    icon: <DashboardIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" />,
  },
  {
    id: 2,
    label: "Generate Your Collection",
    icon: <LibraryBooksIcon style={{ color: "white", marginRight: "1rem" }} fontSize="large" />,
  },
];

type Props = {
  selectedCategory: Category;
  selectedCategoryOnChange: (selectedCategory: Category) => void;
};

export const NFTCategories: React.FC<Props> = ({ selectedCategoryOnChange, selectedCategory }) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {categories.map((category) => {
          if (category.id === selectedCategory.id) {
            return (
              <Grid item xs={12} sm={6} key={category.id.toString()}>
                <Card
                  id={category.id.toString()}
                  className={classes.cardSelected}
                  onClick={() => {
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
                    selectedCategoryOnChange(category);
                  }}
                  key={category.id.toString()}
                >
                  <CardActionArea key={category.id.toString()}>
                    <CardContent className={classes.cardItem} key={category.id.toString()}>
                      {category.icon}
                      <Typography color={"white"} fontSize={24} gutterBottom variant="h5" component="div">
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

import React, {useEffect, useState} from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ForumIcon from '@mui/icons-material/Forum';
import GavelIcon from '@mui/icons-material/Gavel';
import PixIcon from '@mui/icons-material/Pix';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {makeStyles} from '@mui/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Theme,
  Typography,
} from '@mui/material';
import {CategoryType} from '../../utils/types';

const categories: CategoryType[] = [
  {
    id: 1,
    label: 'Company',
    icon: (
      <BusinessIcon
        style={{color: 'white', marginRight: '1rem'}}
        fontSize="large"
      />
    ),
  },
  {
    id: 2,
    label: 'Governance',
    icon: (
      <AssuredWorkloadIcon
        style={{color: 'white', marginRight: '1rem'}}
        fontSize="large"
      />
    ),
  },
  {
    id: 3,
    label: 'Community',
    icon: (
      <ForumIcon
        style={{color: 'white', marginRight: '1rem'}}
        fontSize="large"
      />
    ),
  },
  {
    id: 4,
    label: 'Election',
    icon: (
      <GavelIcon
        style={{color: 'white', marginRight: '1rem'}}
        fontSize="large"
      />
    ),
  },
  {
    id: 5,
    label: 'Venture Capital',
    icon: (
      <PixIcon style={{color: 'white', marginRight: '1rem'}} fontSize="large" />
    ),
  },
  {
    id: 6,
    label: 'Game-Fi',
    icon: (
      <SportsEsportsIcon
        style={{color: 'white', marginRight: '1rem'}}
        fontSize="large"
      />
    ),
  },
  {
    id: 7,
    label: 'Start-Up',
    icon: (
      <RocketLaunchIcon
        style={{color: 'white', marginRight: '1rem'}}
        fontSize="large"
      />
    ),
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
    backgroundSize: 'cover',
    // backgroundColor: "#2D6495 !important",
    // "&:hover": {
    //   backgroundColor: "#A2C5E3 !important",
    // },
    '&.active': {
      background: 'yellow',
    },
  },
  cardItem: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
}));

export const DaoCategories: React.FC<Props> = ({
  activeStepOnChange,
  selectedCategoryOnChange,
  selectedCategory,
}) => {
  const [data, setData] = useState<CategoryType>(categories[0]);

  const classes = useStyles();

  useEffect(() => {
    if (selectedCategory) setData(categories[selectedCategory.id - 1]);
  }, [selectedCategory]);

  return (
    <div>
      <Grid container spacing={2}>
        {categories.map(category => {
          return (
            <Grid item xs={12} sm={6} key={category.id.toString()}>
              <Card
                id={category.id.toString()}
                className={classes.card}
                onClick={() => {
                  activeStepOnChange(2);
                  selectedCategoryOnChange(category);
                  setData(categories[category.id - 1]);
                }}
                key={category.id.toString()}>
                <CardActionArea key={category.id.toString()}>
                  <CardContent
                    className={classes.cardItem}
                    key={category.id.toString()}>
                    {category.icon}
                    <Typography
                      color={'white'}
                      fontSize={30}
                      gutterBottom
                      variant="h5"
                      component="div">
                      {category.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

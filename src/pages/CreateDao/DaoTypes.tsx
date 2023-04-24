import React, {useState} from 'react';
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
  Typography,
} from '@mui/material';

const types = [
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

const useStyles = makeStyles(theme => ({
  card: {
    backgroundImage: "url('/images/bluebg2.jpg') !important",
    backgroundSize: 'cover',
    // backgroundColor: "#2D6495 !important",
    // "&:hover": {
    //   backgroundColor: "#A2C5E3 !important",
    // },
  },
  cardItem: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
}));

type Props = {
  activeStepOnChange: (activeStep: number) => void;
};

export const DaoTypes: React.FC<Props> = ({activeStepOnChange}) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        {types.map(type => {
          return (
            <Grid item xs={12} sm={6}>
              <Card
                id={type.id.toString()}
                className={classes.card}
                onClick={() => {
                  setSelectedCategory(type.id);
                  activeStepOnChange(2);
                }}>
                <CardActionArea>
                  <CardContent className={classes.cardItem}>
                    {type.icon}
                    <Typography
                      color={'white'}
                      fontSize={30}
                      gutterBottom
                      variant="h5"
                      component="div">
                      {type.label}
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

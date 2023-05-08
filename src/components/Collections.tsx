/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Card, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    borderRadius: '0.5rem',
    padding: '20px',
    // minHeight: "100%",
    minHeight: '200px',
  },
  name: {
    color: 'white',
    justifyContent: 'center !important ',
    alignItems: 'center !important',
    display: 'flex',
    width: '100%',
    margin: '10px',
    fontFamily: 'Signika Negative',
    backgroundColor: '#ff761c',
    borderRadius: '0.5rem',
    padding: '5px',
  },
  date: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontSize: '12px',
    marginBottom: '10px',
    fontFamily: 'Signika Negative',
  },
  description: {
    align: 'center !important',
    color: 'black',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    display: 'flex',
    fontSize: '14px',
    fontFamily: 'Signika Negative',
    marginBottom: '10px',
  },
  value: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Signika Negative',
    fontSize: '12px',
  },
});

type Props = {name: string; address: string; image: string};

export const Collection: React.FC<Props> = ({name, address, image}) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}>
          <Grid item>
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}>
              <img
                src={image || 'https://i.ibb.co/XYv6QT1/Daoton-Logo.png'}
                width="200"
                height="auto"></img>
              {/* <img onError="this.onerror=null;this.src='https://i.ibb.co/XYv6QT1/Daoton-Logo.png';" src={image} width="200" height="auto"></img> */}
            </div>
            <Grid container>
              <p className={classes.name}>{name}</p>
            </Grid>
            <p className={classes.description}>Address: {address} </p>
            {/* <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <p className={classes.description}>aaa</p>
                                <Button
                                    style={{ maxWidth: "0.2rem", maxHeight: "1rem" }}
                                    endIcon={<CopyAll/>}
                                    onClick={() => {
                                        navigator.clipboard.writeText(description);
                                    }}
                                ></Button>
                            </Box> */}
            <br />
          </Grid>
        </div>
      </Card>
    </div>
  );
};

/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Grid, IconButton} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {Card} from 'reactstrap';
import {CopyAll} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    borderRadius: '0.5rem',
    padding: '20px',
    minHeight: '40vh',
    cursor: 'pointer',
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
  value: {
    align: 'center !important',
    color: 'black',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    display: 'flex',
    fontSize: '14px',
    fontFamily: 'Signika Negative',
    marginBottom: '10px',
  },
  description: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Signika Negative',
    fontSize: '1rem',
  },
});

type Props = {
  name: string;
  date: string;
  description: string;
  value: string;
  daoId: string;
  daoImg: string;
};

export const DaoCard: React.FC<Props> = ({
  name,
  date,
  description,
  value,
  daoId,
  daoImg,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Card
        className={classes.card}
        onClick={() => {
          navigate('/view-dao/' + daoId);
        }}>
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}>
          <Grid item>
            <div>
              <div
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '6rem',
                }}>
                <img
                  style={{objectFit: 'contain', padding: '1rem'}}
                  width={200}
                  height={200}
                  src={daoImg || 'images/logobg.png'}
                />
              </div>
            </div>
            <div style={{marginTop: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Grid container width={'13rem'}>
                  <p className={classes.name}>{name}</p>
                </Grid>
              </div>
              <p className={classes.date}>Created on {date}</p>
              <p className={classes.description}>{description}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'end',
                }}>
                <div style={{width: '80%'}}>
                  <p className={classes.value}>
                    {value.slice(0, 13) + '...' + value.slice(-3)}
                  </p>
                </div>
                <div style={{width: '20%'}}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      navigator.clipboard.writeText(value);
                    }}>
                    <CopyAll />
                  </IconButton>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

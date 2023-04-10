/* eslint-disable jsx-a11y/alt-text */
import { Card, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
  name: string;
  address: string;
  collectionAddress: string;
  description: string;
  image: string;
};

export const NftCard: React.FC<Props> = ({ name, address, collectionAddress, description, image }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Grid item>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <img
                src={image ? image : "https://talis-protocol.mo.cloudinary.net/tokens/63b23955cd6bafb22aadc85a/mediaThumbnail"}
                height={"200"}
                // onError="this.onerror=null;this.src='https://i.ibb.co/42mMZZz/image.png';"
              />
            </div>
            <Grid container>
              <p className={classes.name}>{name ? name : "Pastel Dream"}</p>
            </Grid>
            <p className={classes.description}>Address: {address}</p>
            <p className={classes.description}>Collection Address: {collectionAddress}</p>
            <p className={classes.description}>Description: {description}</p>
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

const useStyles = makeStyles({
  container: {
    padding: "1rem",
  },
  card: {
    backgroundColor: "white",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
    borderRadius: "0.5rem",
    padding: "20px",
    // minHeight: "100%",
    minHeight: "200px",
  },
  name: {
    color: "white",
    justifyContent: "center !important ",
    alignItems: "center !important",
    display: "flex",
    width: "100%",
    margin: "10px",
    fontFamily: "Signika Negative",
    backgroundColor: "#ff761c",
    borderRadius: "0.5rem",
    padding: "5px",
  },
  date: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontSize: "12px",
    marginBottom: "10px",
    fontFamily: "Signika Negative",
  },
  description: {
    align: "center !important",
    color: "black",
    justifyContent: "center !important",
    alignItems: "center !important",
    display: "flex",
    fontSize: "14px",
    fontFamily: "Signika Negative",
    marginBottom: "10px",
  },
  value: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: "Signika Negative",
    fontSize: "12px",
  },
});

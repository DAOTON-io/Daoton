import React, {useState, useRef, ChangeEvent} from 'react';
import {Button, IconButton} from '@mui/material';
import {makeStyles} from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  imageDiv: {
    textAlign: 'center',
  },
  input: {
    display: 'none',
  },
  preview: {
    marginTop: theme.spacing(2),
    maxWidth: '85%',
    maxHeight: 200,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
}));

type Props = {
  onChange: (image: any) => void;
  onClear: () => void;
};

export const ImageUpload: React.FC<Props> = ({onChange, onClear}) => {
  const [file, setFile] = useState<File>();
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      // console.log(Buffer.from(JSON.stringify(file)).toString('base64'));
      // console.log(window.btoa(JSON.stringify(file)));

      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = event => {
        if (event.target?.result) {
          onChange(event.target.result);
        }
      };

      setFile(file);
      //onChange(Buffer.from(JSON.stringify(file)).toString('base64'));
    }
  };

  const handleClearButtonClick = () => {
    setFile(undefined);
    onClear();

    inputRef.current!.value = '';
  };

  return (
    <div className={classes.root}>
      <input
        ref={inputRef}
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        className={classes.input}
        onChange={handleFileInputChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Select Image
        </Button>
      </label>
      {file && (
        <div className={classes.imageDiv}>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className={classes.preview}
          />
          <IconButton
            aria-label="clear image"
            className={classes.clearButton}
            onClick={handleClearButtonClick}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

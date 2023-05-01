import {ChangeEvent, useState} from 'react';

type Props = {
  jsonFile: (file: any) => void;
};

const FileUploder: React.FC<Props> = ({jsonFile}) => {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
    })
      .then(res => res.json())
      .then(data => {
        console.log(JSON.parse(data.data));
        jsonFile(JSON.parse(data.data));
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default FileUploder;

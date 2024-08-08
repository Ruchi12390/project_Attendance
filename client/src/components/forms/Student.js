import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  course: {
    padding: '0px',
    width: '100%',
    marginTop: theme.spacing(4),
  },
  select: {
    width: '90%',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Student1() {
  const classes = useStyles();
  const [selectedSemester, setSelectedSemester] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    if (!file) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    if (!selectedSemester) {
      setUploadStatus('Please select a semester');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester', selectedSemester);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response:', response.data); // Debugging line
      setUploadStatus(response.data.message || 'File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      setUploadStatus(error.response?.data?.message || 'Error uploading file');
    }
  };

  return (
    <Grid container spacing={3} className={classes.course}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="semester-label"></InputLabel>
          <Select
            id="semester"
            name="semester"
            value={selectedSemester}
            onChange={handleSemesterChange}
            className={classes.select}
            displayEmpty
            labelId="semester-label"
          >
            <MenuItem value="" disabled>Select Semester</MenuItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <MenuItem key={sem} value={`sem${sem}`}>{sem}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <form className="form-group custom-form" onSubmit={handleSubmit}>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept=".csv" // Ensure you accept the correct file type
            style={{ marginBottom: '16px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            UPLOAD
          </Button>
        </form>
        {uploadStatus && (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
            {uploadStatus}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Student1;

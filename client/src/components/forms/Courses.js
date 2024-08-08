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
    width: '70%',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Courses() {
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
  
    // Validate and process form data here
    // ...
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('semester', selectedSemester);
  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Error uploading file');
    }
  };
  

  return (
    <Grid container spacing={3}>
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
        <div className={classes.course}>
          <form className="form-group custom-form" onSubmit={handleSubmit}>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
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
        </div>
      </Grid>
    </Grid>
  );
}

export default Courses;

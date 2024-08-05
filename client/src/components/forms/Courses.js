import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  course: {
    padding: '0px',
    width: '100%',
    marginTop: '60px',
  },
}));

function Courses() {
  const classes = useStyles(); // Use the useStyles hook

  return (
    <div className={classes.course}>
      <form className="form-group custom-form">
        <input type="file" />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
      </form>
    </div>
  );
}

export default Courses;
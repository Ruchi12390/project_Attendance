import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AssignmentIndTwoToneIcon from '@material-ui/icons/AssignmentIndTwoTone';
import { connect } from 'react-redux';
import { logout, fetchData } from '../redux/actionCreators';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        width: '3em',
        height: '3em',
        backgroundColor: 'transparent',
        objectFit: 'contain',
        display: 'block'
    },
    title: {
        flexGrow: 1,
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit'
        }
    },
    appBar: {
        backgroundColor: '#ADD8E6',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const ButtonAppBar = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRole, setSelectedRole] = useState('student'); // Default role

    const handleClick = () => {
        history.push("/dashboard");
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleLoginRedirect = () => {
        history.push(`/login/${selectedRole}`);
        handleCloseDialog();
    };

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <img className={classes.logo} src="./logo1.jpg" alt="logo" />
                    <Typography variant="h5" className={classes.title}>
                        <Link exact to="/" className={classes.link}>Attendance</Link>
                    </Typography>
                    {(!props.token) ? (
                        <React.Fragment>
                            <Button color="inherit">
                                <Link to="/signup" className={classes.link}>Signup</Link>
                            </Button>
                            <Button color="inherit" onClick={handleOpenDialog}>
                                Login
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button color="inherit" onClick={handleClick}>
                                <AssignmentIndTwoToneIcon />
                            </Button>
                            <Button onClick={props.logout} color="inherit">
                                <Link to="/login" className={classes.link}>Logout</Link>
                            </Button>
                        </React.Fragment>
                    )}
                </Toolbar>
            </AppBar>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Select Role</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role-select"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            label="Role"
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLoginRedirect} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.resume.token
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(logout()) },
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
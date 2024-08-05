import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchData, setData } from '../redux/actionCreators';

import "./stylesheets/home.scss";


const Home = (props) => {

    const history = useHistory();

    //const [title, setTitle] = React.useState('');



    React.useEffect(() => {
        if (props.token) {
            props.fetchData(props.token, function () {
                //history.push("/builder")
            })
        }
    }, []) //eslint-disable-line

    // const handleChange = (event) => {
    //     setTitle(event.target.value);
    //     props.setData(event.target.value, function () {
    //         history.push("/builder")
    //     })
    // };

    const handleClick = () => {
        props.setData(-1, function () {
            history.push("/builder")
        })
    };
    const handleClick1 = () => {
        props.setData(-1, function () {
            history.push("/attendance")
        })
    };
    const handleClick2 = () => {
        props.setData(-1, function () {
            history.push("/marks")
        })
    };
    const publicURL = process.env.PUBLIC_URL;

    return (

        <div className="page-wrapper">
            
            <div className="main container-fluid">

                <section className="top row d-flex" >
                    <div className="col-sm left">
                        <div className=" heading-content align-middle">
                            <span className="main-heading">Attendance and Achievement Manager</span>
                            <br></br>
                            
                        </div>
                        <br></br>
                        <div>
                          <ul style={{ listStyleType: 'none', padding: 0 }}>
                               <li>
                                   <button className="btn btn-primary btn-lg" style={{ backgroundColor: "#ADD8E6", width: '400px', height: '60px'}} onClick={handleClick1}>Attendance </button>
                               </li>
                               <li>
                                   <button className="btn btn-primary btn-lg" style={{ backgroundColor: "#ADD8E6", width: '400px', height: '60px' }} onClick={handleClick2}>Marks Entry</button>
                               </li>
                               <li>
                                <button className="btn btn-primary btn-lg" style={{ backgroundColor: "#ADD8E6" , width: '400px', height: '60px'}} onClick={handleClick}>CO Mapping</button>
                               </li>
                           </ul>
                        </div>

                    </div>
                    <div className="col-sm right new">
                        <img src={publicURL + "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/283685515/original/6f5fe15ac6cc54febe1db87fdf89c17fdae2a01e/write-a-professional-resume-and-cv.jpg"} alt=" resume" />
                    </div>
                </section>
                
                <section className="build-wrapper ">
                    
                </section>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        token: state.resume.token,
        data: state.resume.data
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    setData: (props, callback) => { dispatch(setData(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
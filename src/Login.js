import React from "react";
import { withRouter } from "react-router-dom";
import './login.css';
import {
    // FormGroup,
    // InputGroup,
    Input,
    // Button,
    // Card,
    // CardHeader,
    // CardImg,
    // CardBody,
    // CardFooter,
    // Text
} from "reactstrap";
import axios from "axios"
import { getByEmail } from "./service.js"
// import Homepage from "./Homepage"

class Login extends React.Component {
    state = {
        viewLogin: true,
        viewHomepage: false,
        email: "",
        emailValid: true,
        isLoaded: false,
        items: [],
        error: {},
        loginDisabled: true
    };
    componentDidMount() {
        //call the axios function to get the data
        // this.getData();
    }
    getData = () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(

                (result) => {
                    console.log("result", result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    },
                        // () => {
                        //     this.compareData();
                        // })
                        //},
                        // handling errors here
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            }

                            )
                            console.log("this is our error message")
                            console.log(this.state.error);
                        })
                })
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

        const email = value;
        console.log("passed email", email)
        const word = email.includes("@")
        const com = email.includes(".")

        if (word && com) {
            this.setState({ loginDisabled: false });
            // return email;
        } else {
            this.setState({ loginDisabled: true })

            // return false;
        }

        // this.emailValidation();
        // const validPass = this.passwordValidation(password);
        // if (validEmail) {
        //     this.setState({ [email]: email });
        // } if (validPass) {
        //     this.setState({ [password]: password });
        // }

    };
    clearForm = e => {
        this.setState({
            email: "",
            emailValid: true
        });
    };
    loginButtonClick = () => {
        console.log("The login button was clicked")
        // const email = this.state.email
        // console.log("email", email)
        //this.getData();
        getByEmail(this.state.email).then(
            (result) => {
                console.log("result", result)
                this.setState({
                    items: result.data
                })
                this.compareData();
            })
    }
    compareData = () => {
        const items = this.state.items;
        console.log("comparing data", items)
        const email = this.state.email;
        console.log("comparing email", email)

        for (let i = 0; i < items.length; i++) {
            if (items[i].email === email) {
                //redirects to the homepage
                console.log("email match", items[i].email)
                // this.setState({ viewHomepage: true, viewLogin: false })
                this.props.history.push("/" + items[i].id);
            } else {
                console.log("no email match")
                //this.setState({ viewHomepage: false, viewLogin: true, emailValid: false })
            }
        }
    }
    render() {
        const items = this.state.items;
        const enableButton = this.state.loginDisabled;
        console.log(items);
        return (
            <div className="container" >
                {!this.state.viewLogin ? <span></span> : (
                    <div className="row">
                        <div className="col"></div>

                        <div className="col-6">
                            <div>
                                <p style={{ textAlign: "center", fontSize: "2em" }}> Welcome to Dunder-Mifflin</p>
                                <p style={{ textAlign: "center" }}>
                                    Welcome to the dunder-mifflin internal network.
                         <br />
                                    Please enter a username to view your posts and comments.
                        </p>
                            </div>

                            <div>
                                {this.state.emailValid ? (<span></span>) : (<p style={{ color: "red" }}> Invalid email</p>)}
                                <Input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="email" required />

                                <button className="btn btn-secondary" size="block" onClick={this.loginButtonClick} disabled={enableButton}> Login</button>
                                <span></span>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>)}
                {/* {this.state.viewHomepage ? (
                    <div>
                        <Homepage user={this.state.items[0]}></Homepage>
                    </div>) : (<div> </div>)} */}

            </div>
        );

    }
}

export default withRouter(Login);

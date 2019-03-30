import React from "react";
import { withRouter, Link } from "react-router-dom";
import './login.css';
import {
    FormGroup,
    InputGroup,
    Input,
    Button,
    Card,
    CardHeader,
    //CardImg,
    CardBody,
    CardFooter,
    Text
} from "reactstrap";

class Login extends React.Component {
    state = {
        email: "",
        valid: true
    };
    componentDidMount() { }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
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
            valid: ""
        });
    };
    loginClick = () => {
        console.log("The login button was clicked")
        const email = this.state.email
        console.log("email", email)
        this.emailValidation(email);
        //call the axios function to get the data
    }
    emailValidation = (email) => {
        console.log("passed email", email)
        const word = email.includes("@")
        if (word) {
            this.setState({ emailValid: false });
        } else { this.setState({ emailValid: true }) }

    }
    render() {
        return (
            <div className="container">
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
                            {!this.state.emailValid ? (<span></span>) : (<p style={{ color: "red" }}>Please make sure this is a valid email address</p>)}
                            <Input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="email" required />

                            <Button className="btn btn-secondary" size="block" onClick={this.loginClick}> Login</Button>
                            <span></span>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>

            </div>
        );

    }
}

export default withRouter(Login);

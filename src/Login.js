import React from "react";
import { withRouter } from "react-router-dom";
import './login.css';
import { Input, Button } from "reactstrap";
import { getByEmail } from "./service.js"

class Login extends React.Component {
    state = {
        email: "",
        emailValid: true,
        isLoaded: false,
        items: [],
        loginDisabled: true
    };

    handleChange = e => {
        e.preventDefault();
        //getting value from input
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        const email = value;
        // checking email value
        const word = email.includes("@")
        const com = email.includes(".")
        if (word && com) {
            this.setState({ loginDisabled: false });
        } else {
            this.setState({ loginDisabled: true })
        }
    };
    clearForm = e => {
        this.setState({
            email: "",
            emailValid: true
        });
    };
    loginButtonClick = () => {
        console.log("The login button was clicked")
        //calls the axios function to search the api for the email
        getByEmail(this.state.email).then(
            (result) => {
                console.log("result", result)
                // set state
                this.setState({
                    items: result.data
                })
                if (result.data.length === 0) {
                    this.setState({ emailValid: false })
                }
                // compare the data that was passed in
                this.compareData();
            })
        // clears the form
        this.clearForm();
    }
    compareData = () => {
        const items = this.state.items;
        const email = this.state.email;
        // looping through the data to see if the values match with what was inputted
        for (let i = 0; i < items.length; i++) {
            if (items[i].email === email) {
                //redirects to the homepage
                this.props.history.push("/" + items[i].id);
            } else {
                console.log("no email match")
                this.setState({ emailValid: false })
            }
        }
    }
    render() {
        const items = this.state.items;
        const enableButton = this.state.loginDisabled;

        if (!items) {
            return <h4>Loading...</h4>
        } else {

            return (
                <div className="container" >
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6 space">
                            <div>
                                <p style={{ textAlign: "center", fontSize: "2em" }}> Welcome to Dunder-Mifflin</p>
                                <p style={{ textAlign: "center" }}>
                                    Welcome to the dunder-mifflin internal network.
                         <br />
                                    Please enter a username to view your posts and comments.
                        </p>
                            </div>
                            <div>
                                {/* Will display message if no match is found */}
                                {this.state.emailValid ? (<span></span>) : (<p style={{ color: "red" }}> Invalid email</p>)}

                                <Input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="email" required />

                                <Button className="btn btn-secondary" size="block" onClick={this.loginButtonClick} disabled={enableButton}> Login</Button>
                                <span></span>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            )
        }

    }
}

export default withRouter(Login);

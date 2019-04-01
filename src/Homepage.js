import React from "react"
import { withRouter } from "react-router-dom"
import axios from "axios"

class Homepage extends React.Component {
    state = {
        yes: false
    }

    render() {
        const user = this.props
        console.log(user)
        return (
            <React.Fragment>
                <div>
                    <div className="profile">
                        <h3>{user.name}</h3>
                        <h3>{user.adress}</h3>
                        <h3>{user.phone}</h3>


                    </div>
                    <div className="Post">
                        Post Name
                <div className="commentSection" >
                        </div>
                    </div>
                </div>
            </React.Fragment>)
    }

}

export default Homepage;
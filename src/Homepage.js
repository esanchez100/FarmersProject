import React from "react"
import { getByUserId, getPostsById } from "./service.js"
import Comments from "./Comments"
import "./homepage.css"

class Homepage extends React.Component {
    state = {
        userInfo: [],
        address: {},
        posts: [],
        comments: []
    }
    componentDidMount = () => {
        const { userId } = this.props.match.params;
        console.log(userId)
        //calls function to load page info
        this.getUserData(userId)
    }
    getUserData = (userId) => {
        //axios call to get user info
        getByUserId(userId).then(response => {
            console.log("user response", response.data)
            this.setState({ userInfo: response.data, address: response.data.address })
            this.getPosts(response.data.id)
        })
    }
    getPosts = (userId) => {
        //getting all posts for the user
        getPostsById(userId).then(posts => {
            console.log("post response", posts.data)
            this.setState({ posts: posts.data })
            console.log("passing this id", this.state.posts)
        })
    }

    render() {
        const userInfo = this.state.userInfo
        const userAddress = this.state.address
        console.log("user Info", userInfo, userAddress)
        const posts = this.state.posts
        console.log("posts", posts)

        if ((!userInfo && !posts)) {
            return <h2>Loading...</h2>;
        } else {
            return (
                <div>
                    <div className="main-container">
                        <div className="left">
                            <div className="profile-container profileBox">
                                {/* Listing out the profile details */}
                                <div className="profile">Profile Detail<hr /></div>
                                <div className="name"> <p>{userInfo.name}</p></div>
                                <div className="profile1"><i className="fas fa-map-marker-alt fa-2x"></i></div>
                                <div className="profile2"><i className="fas fa-phone fa-2x"></i></div>
                                <div className="profile3"><i className="fas fa-envelope fa-2x"></i></div>

                                <div className="address"><p>{userAddress.street + " " + userAddress.suite}<br />
                                    {userAddress.city + " " + userAddress.zipcode}</p></div>
                                <div className="phone"><p>{userInfo.phone}</p></div>
                                <div className="email"><p>{userInfo.email} </p></div>
                            </div>
                        </div>
                        <div className="right ">
                            {posts.map(post =>
                                <div className="divider" key={post.id}>
                                    <div className="post" >
                                        {/* listing out all of the individual posts */}
                                        <p><strong>{post.title}</strong></p>
                                        <p>{post.body}</p>

                                    </div >
                                    {/* calling the component and passing data needed to get all comments for the post */}
                                    <Comments postId={post.id} />
                                </div>
                            )}
                        </div >
                    </div>
                </div>
            )
        }
    }
}
export default Homepage;
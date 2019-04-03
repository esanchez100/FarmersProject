import React from "react"
// import { withRouter } from "react-router-dom"
// import axios from "axios"
import { getByUserId, getPostsById, getAllComments, getCommentsByPostId } from "./service.js"
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
        //get user info

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
            //this.getComments()
        })
    }
    getComments = () => {
        //getting Post Comments 
        // const posts = this.state.posts
        // console.log(" post to loop through", posts);
        // for (let i = 0; i < posts.length; i++) {
        //     console.log(posts[i]);
        // }
        // 
        getAllComments().then(comments => {
            // console.log("all comments", comments.data)
            this.setState({ comments: comments.data })

        })
        // )
        //console.log("post id being passed")



        // return comments;
    }


    render() {
        const userInfo = this.state.userInfo
        const userAddress = this.state.address
        console.log("user Info", userInfo, userAddress)
        const posts = this.state.posts
        console.log("posts", posts)
        // const postComments = this.state.comments
        // console.log("post comments", postComments)

        if ((!userInfo && !posts)) {
            return <h2>Loading...</h2>;
        } else {
            return (
                <div>

                    <div class="main-container">

                        <div class="left">


                            <div className="profile-container profileBox">



                                <div class="profile">Profile<hr /></div>
                                <div class="name"> <p>{userInfo.name}</p></div>
                                <div class="profile1"><i class="fas fa-map-marker-alt fa-2x"></i></div>
                                <div class="profile2"><i class="fas fa-phone fa-2x"></i></div>
                                <div class="profile3"><i class="fas fa-envelope fa-2x"></i></div>

                                <div class="address"><p>{userAddress.street + " " + userAddress.suite}<br />
                                    {userAddress.city + " " + userAddress.zipcode}</p></div>
                                <div class="phone"><p>{userInfo.phone}</p></div>
                                <div class="email"><p>{userInfo.email} </p></div>
                            </div>

                        </div>
                        <div className="right ">
                            {posts.map(post =>
                                <div>
                                    <div className="post" key={post.id}>

                                        <p><strong>{post.title}</strong></p>
                                        <p>{post.body}</p>



                                    </div >


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
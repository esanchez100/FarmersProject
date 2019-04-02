import React from "react"
// import { withRouter } from "react-router-dom"
// import axios from "axios"
import { getByUserId, getPostsById, getCommentsByPostId } from "./service.js"

class Homepage extends React.Component {
    state = {
        userInfo: [],
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
            this.setState({ userInfo: response.data })
            this.getPosts(response.data.id)
        })

    }
    getPosts = (userId) => {
        //getting all posts for the user
        getPostsById(userId).then(posts => {
            console.log("post response", posts.data)
            this.setState({ posts: posts.data })
            console.log("passing this id", posts.data)
            this.getPostComments()
        })
    }
    getPostComments = () => {
        //getting Post Comments 
        const posts = this.state.posts
        console.log(posts);

        // getCommentsByPostId(postId).then(comments => {
        //     console.log("comment response", comments.data)
        //     this.setState({ comments: comments.data })
        //     console.log("all gets done")
        // })
    }


    render() {
        const userInfo = this.state.userInfo
        console.log("user Info", userInfo)
        const userPosts = this.state.posts
        console.log("posts", userPosts)
        const postComments = this.state.comments
        console.log("comments", postComments)
        if ((!userInfo && !userPosts && !postComments)) {
            return <h2>Loading...</h2>;
        } else {
            return (
                <div>

                    <div>
                        <div className="profile">
                            <h4>{userInfo.name}</h4>
                            <h4>{userInfo.adress}</h4>
                            <h4>{userInfo.phone}</h4>
                        </div>
                        <div className="Post">
                            {userPosts.map(item =>
                                <div key={item.id}>
                                    <p>{item.title}}</p>
                                    {/* <div className="commentSection" >{}
                        </div> */}
                                </div>
                            )}
                        </div>
                    </div >

                </div >
            )
        }


    }
}
export default Homepage;
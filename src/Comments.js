import React from "react"
import { getAllComments, getCommentsByPostId } from "./service"
import "./homepage.css"


class Comments extends React.Component {
    state = {
        comments: []
    }
    componentDidMount = () => {
        //calling function and passing post id that was passed as a prop
        const id = this.props.postId;
        console.log("post id passed", id)
        this.getPostComments(id)
    }
    getPostComments = (postId) => {
        getCommentsByPostId(postId).then(comments => {
            console.log("comment for post", comments.data)
            this.setState({ postComment: comments.data })
        })

    }
    render() {
        const comments = this.state.postComment;
        if (!comments) {
            return <h4> will display comments soon...</h4>
        }
        else {
            return (<div className="post">
                {comments && (comments.map(comment =>
                    <div key={comment.id}>
                        <p><strong>{comment.name}</strong> </p>
                        <p>{comment.body} </p>
                        <hr />
                    </div>
                ))}
            </div>)
        }
    }
}
export default Comments;
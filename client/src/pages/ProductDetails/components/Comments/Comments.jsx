import {useEffect, useState} from "react";
import {Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectorCommentError, selectorProduct, selectorProductComments, selectorToken} from "../../../../selectors";
import './Comments.scss';
import {actionFetchAddComment, actionFetchAllComments} from "../../../../reducers";
import Comment from "./Comment";
import Button from "../../../../components/Button";
const Comments = () => {
    const dispatch = useDispatch();
    const product = useSelector(selectorProduct);
    const token = useSelector(selectorToken);
    const comments = useSelector(selectorProductComments);
    const commentError = useSelector(selectorCommentError);
    const [review, setReview] = useState('');

    useEffect(() => {
        dispatch(actionFetchAllComments(product.itemNo));
    }, [product]);

    const [isMoreComments, setIsMoreComments] = useState(false);
    const handleReviewChange = (event) => {
        if (event.target.value.length <= 48){
            setReview(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            product: product.itemNo,
            content: review,
            date: new Date()
        }
        dispatch(actionFetchAddComment(data));
        setReview('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    }


    return (
        <>
            <Box className="product__comments-wrapper">
                {token && <Box className="product__input-wrapper">
                    <h3 className="product__comments-title">Leave your feedback:</h3>
                    <form onSubmit={handleSubmit} className="product__form">
                        <TextField
                            className="product__review-input"
                            label="Write a review"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={review}
                            onChange={handleReviewChange}
                            required
                            fullWidth
                            color="success"
                            onKeyDown={handleKeyDown}
                            helperText={`${review.length}/${48} characters`}
                        />
                         <Button type="submit" width="180px" className="product__form-button" text="Send" />
                    </form>

                    {commentError && <p className="product__comment-error">Failed to add comment, please try again!</p>}
                </Box>}

                <Box className="product__comments-content">
                    <h3 className="product__comments-title">Reviews</h3>

                    <Box className="comments">
                        {comments?.map((comment, index) => {
                            return (<Comment comment={comment} key={index} className={isMoreComments && "more-active"} itemNo={product._id}/>)
                        })}

                        {comments.length === 0 && <p>There are currently no reviews for this product.</p>}

                    </Box>
                    {comments.length > 4 && <Button
                        type="button"
                        width="180px"
                        className="comments__show-more-btn"
                        text={isMoreComments ? "Show less" : "Show more"}
                        onClick={() => setIsMoreComments(!isMoreComments)} />}
                </Box>
            </Box>
        </>
    )
}

export default Comments;


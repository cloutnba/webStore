import {Box} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {actionFetchDeleteComment, actionFetchUpdateComment} from "../../../../reducers";
import {selectorUserData} from "../../../../selectors";

const Comment = ({comment, className, itemNo}) => {
    const userData = useSelector(selectorUserData);
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(true);
    const [commentValue, setCommentValue] = useState(comment.content);

    const updateComment = () => {
        dispatch(actionFetchUpdateComment(commentValue, comment._id));
        setIsDisabled(true);
    }

    const deleteComment = () => {
        dispatch(actionFetchDeleteComment(comment._id, itemNo));
    }

    const isSameUser = () => {
        const userId = userData._id;
        const commentUserId = comment.customer._id;

        return userId === commentUserId;
    }

    const formattingDate = new Date(comment.date).toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})

    return(
      <Box className={`product__comment ${className}`}>
          <Box className="product__comment-user-wrapper">
              <p className="product__comment-user">{comment.customer.firstName} {comment.customer.lastName}</p>
              <span>&nbsp; / &nbsp;</span>
              <p className="product__comment-date">{formattingDate}</p>
          </Box>

          <Box className="product__comment-actions">
              {isSameUser() && <EditIcon className="product__comment-action" onClick={() => {
                  setIsDisabled(false)
              }}/>}
              {isSameUser() && <DeleteIcon className="product__comment-action" onClick={deleteComment}/>}
              {!isDisabled && <DoneIcon className="product__comment-action" onClick={updateComment}/>}
          </Box>

          <Box className="product__comment-text-wrapper">
              {! isDisabled ?
                  <textarea type="text"
                         value={commentValue}
                         onChange={(e) => {
                             setCommentValue(e.target.value)
                         }}
                         className="product__comment-text"
                         disabled={isDisabled}/>
                  :
                  <p className="product__comment-text">{commentValue}</p>
              }

          </Box>
      </Box>
  )
}

export default Comment;


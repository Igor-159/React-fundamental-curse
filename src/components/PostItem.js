import MyButton from './UI/button/MyButton';
import {NavLink} from 'react-router-dom';

const PostItem = (props) =>{
    
    return(
        <div className='post'>
          <div className='post__content'>
            <strong>{props.post.id} {props.post.title}</strong>
            <div>
              {props.post.body}
            </div>
          </div>
          <div className='post__btns'>
              <NavLink end to={'/posts/'+ props.post.id}>
              <MyButton onClick={()=> {}}>Открыть</MyButton>
              </NavLink>
              <MyButton onClick={()=> props.removePost(props.post)}>Удалить</MyButton>
          </div>
        </div>
    )
}

export default PostItem;
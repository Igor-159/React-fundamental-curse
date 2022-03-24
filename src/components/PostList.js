import { TransitionGroup, CSSTransition} from 'react-transition-group';
import PostItem from './PostItem';

const PostList = ({posts, title, removePost}) =>{
    if(!posts.length){
        return(
            <h2 className='title_posts_empty'>
                Посты не найдены!
            </h2>
        )
    }

    return(
        <div>
            <h1 className="header-title">{title}</h1>
            <TransitionGroup>
                {[posts.map((post, index) => 
                <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames="post"
                    >
                <PostItem removePost={removePost} number={index + 1} post={post} />
                </CSSTransition>
                )]}
          </TransitionGroup>
        </div>
    )
}

export default PostList;
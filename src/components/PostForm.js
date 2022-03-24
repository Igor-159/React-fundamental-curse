import { useState } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) =>{
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        };
        create(newPost);
        setPost({title: '', body: ''});
      }


    return (
        <form>
          <MyInput type='text'
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})} 
          placeholder="название поста"/>
          <MyInput type='text'
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})} 
          placeholder="описание поста"/>
          <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;
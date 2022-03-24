import { useEffect, useRef, useState } from 'react';
import PostService from '../API/PostService';
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from "../components/UI/MyModal/MyModal";
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from "../hooks/usePosts";
import { getPageCount } from '../utils/pages';

function Posts() {
  
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();
  
  

  const [fetchPosts, isPostLoading, postError] = useFetching(async ()=> {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
    
      const totalCount = response.headers['x-total-count']
      console.log(totalCount)
      setTotalPages(getPageCount(totalCount, limit));
  })
  
  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  })

  useEffect(()=> {
    fetchPosts(limit, page)
  },[page, limit]);

  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
    setModal(false);
  }

  


  const removePost = (post) =>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  
  return (
    <div className="App">
        <button onClick={fetchPosts}>Get posts</button>
        <MyButton onClick={()=> setModal(true)}>
          Создать пользователя
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
        </MyModal>
        <PostFilter 
          filter={filter}
          setFilter={setFilter}/>
        <MySelect 
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="Кол-во элементов на странице"
            options={[
              {value: 5, name: '5'},
              {value: 10, name: '10'},
              {value: 25, name: '25'},
              {value: -1, name: 'Показать всё'},
            ]}
        />    
          {postError &&
          <h2>Warning ... ${postError}</h2> }
          <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={"Список постов 1"}/>

          
          <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
          

          {isPostLoading &&
             <div style={{display: "flex", justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
          }
          <Pagination 
            totalPages={totalPages} 
            changePage={changePage} 
            page={page}/>
          
    </div>
  );
}

export default Posts;

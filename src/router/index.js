import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import Abouth from '../pages/About';
import Login from '../pages/Login';



export const privateRoutes = [
    {path: '/about', element: <Abouth/>},
    {path: '/posts', element: <Posts/>},
    {path: '/posts/:id', element: <PostIdPage/>},
    {path: '/*', element: <Posts/>}
];

export const publicRoutes = [
    {path: '/login', element: <Login/>},
    {path: '*', element: <Login/>}
    
]
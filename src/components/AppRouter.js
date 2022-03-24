import {privateRoutes, publicRoutes} from '../router/index';
import {Route, Routes} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading){
        return<Loader/>
    }

    return (
        isAuth
        ? <Routes>
            {privateRoutes.map(route => 
                <Route 
                    element={route.element} 
                    path={route.path}
                    key={route.path}/>   
            )}
        </Routes>
        : <Routes>
            {publicRoutes.map(route => 
                <Route 
                    element={route.element} 
                    path={route.path}
                    key={route.path}/>
            )}
        </Routes>
            
    );
};

export default AppRouter;
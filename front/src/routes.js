import React from 'react';
import {Route} from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomePage from './containers/HomePage';
import NotFound from './containers/NotFound';
import UploadPage from './containers/UploadPage';
import ProfilePage from './containers/ProfilePage';
import PhotosPage from './containers/PhotosPage';
import AlbumPage from './containers/AlbumPage';
import AlbumDetails from './components/AlbumDetails';
import AddPic from './components/AddPic';
import UserDetail from './components/UserDetail';
import UserBuffer from './containers/userbuffer';


export default
<Route path="/" components={App}>
    <Route path="/login" component={LoginPage}/>
    <Route path="/upload" component={UploadPage}/>
    <Route path="/signup" component={SignupPage}/>
    <Route path="/home" component={HomePage}/>
    <Route path="/roadmap" component={NotFound}/>
    <Route path="/album" component={AlbumPage}/>
    <Route path="/addpic/:id" component={AddPic}/>
    <Route path="/album/:id" component={AlbumDetails}/>
    <Route path="/user/:id" component={UserDetail}/>
    <Route path="/users/:id" component={UserBuffer}/>
    <Route path="/photos" component={PhotosPage}/>
    <Route path="/profile" component={ProfilePage}/>
    <Route path="*" component={NotFound}/>

</Route>

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Contact from '../components/Contact'
import { AuthProvider } from '../contextAPI/Context'
import SignIn from '../components/Auth/Signin'
import SignUp from '../components/Auth/SignUp'
import Profile from '../components/User/Profile'
import Projects from '../components/Ideas/Project'
import SingleProject from '../components/Ideas/SingleProject'
import AnotherProfile from '../components/User/AnotherProfile'
import DiscussionDetailPage from '../components/Discussions/DiscussionDetails'
import TermsAndConditions from '../components/TermsAndConditions'
import ReviewPage from '../components/Reviews'
import Chat from '../components/Chats/Chat'
import AllDiscussionsPage from '../components/Discussions/AllDiscussions'
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ideas' element={<Projects/>}/>
          <Route path='/project/:id' element={<SingleProject />} />
          <Route path='/discussions'>
              <Route path='all' element={<AllDiscussionsPage/>}/>
              <Route path = ':id' element={<DiscussionDetailPage/>}/>
              
          </Route>
          <Route path='/chat/:receiver' element={<Chat/>}/>
          <Route path='/user'>
            <Route path='anotherProfile/:username' element={<AnotherProfile/>}/>
            <Route path='profile' element={<Profile/>} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/auth'>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
          <Route path='/review/:projectId' element={<ReviewPage/>}/>
          <Route path='/t&c' element={<TermsAndConditions/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
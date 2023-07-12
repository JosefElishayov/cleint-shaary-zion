import { Box, createTheme, ThemeProvider } from '@mui/material'
import React, {  useContext } from 'react'
import { BrowserRouter,  Route, Routes } from 'react-router-dom'
import AddBranch from './components/admin/branchAdmin/addBranch'
import BranchAdminList from './components/admin/branchAdmin/branchAdminList'
import EditBranch from './components/admin/branchAdmin/editBranch'
import Dashboard from './components/admin/headerAdmin/Dashboard'
import HeaderAdmin from './components/admin/headerAdmin/headerAdmin'
import UserInfo from './components/admin/usersAdmin/userInfo'
import UserList from './components/admin/usersAdmin/userList'
import Login from './components/main/login&signup/login'
import SignUp from './components/main/login&signup/singUp'
import ThemeProvider1 from './mui'
import DonationsList from './components/admin/donationsAdmin/donationsList'
import ImageModal from './components/admin/donationsAdmin/imageModal'
import EditDonations from './components/admin/donationsAdmin/editDonations'
import ContactList from './components/admin/ContactUs/contactList'
import ZmanList from './components/main/zmanim/zman'
import BranchPublic from './components/main/branches/branchPublic'
import Footer from './components/main/footer/footer'
import { MyContext } from './context/myContext'
import AppUser from './components/users/appUser'
import DonationsMain from './components/main/donations/donationsMain'
import { KEY_TOKEN } from './services/apiService'
import DonationSingle from './components/main/donations/donationSingle'
import PurchaseList from './components/admin/purchase/purchaselist'
import BranchUserList from './components/main/branches/branchUserList'
import ContactPost from './components/main/contactUser/contactPost'
import AppMain from './components/main/appMain'
import SearchUser from './components/main/searchUser'
import Nav from './components/main/header/nav'
import ContactPage from './components/test'

export default function AppRoutes() {
  const { token } = useContext(MyContext);
  const theme = createTheme({
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        <Box sx={{ display: 'flex' }}>
          <Routes>
            {localStorage[KEY_TOKEN] && token.role === 'admin' &&
              <Route path='/admin/*' element={<ThemeProvider1><HeaderAdmin /></ThemeProvider1>} />
            }
            {/* <Route path='/*' element={<HeaderClient />} /> */}
          </Routes>
          <Routes>
            {localStorage[KEY_TOKEN] && token.role === 'admin' ?
              <>
                <Route path={`/admin`}  element={<Dashboard />} />
                <Route path='/admin/branchList' element={<ThemeProvider1><BranchAdminList /></ThemeProvider1>} />
                <Route path='/admin/branch/add' element={<AddBranch />} />
                <Route path='/admin/branch/edit/:id' element={<ThemeProvider1><EditBranch /></ThemeProvider1>} />
                <Route path='/admin/donations/edit/:id' element={<ThemeProvider1><EditDonations /></ThemeProvider1>} />
                <Route path='/admin/usersList' element={<UserList />} />
                <Route path='/admin/donationsList' element={<ThemeProvider1><DonationsList /></ThemeProvider1>} />
                <Route path='/admin/contactList' element={<ThemeProvider1><ContactList /></ThemeProvider1>} />
                <Route path='/admin/purchase' element={<ThemeProvider1><PurchaseList /></ThemeProvider1>} />
              </>
              :
              <Route path='*' element={<div></div>} />
            }
          </Routes>
        </Box>
        <Box>
          <Routes>
            {!token || token.role !== 'admin' &&
              <Route path='/*' element={<Nav />} />
            }
          </Routes>
          <Routes>
            <Route path='/signup' element={<ThemeProvider1><SignUp /></ThemeProvider1>} />
            <Route path='/login' element={<ThemeProvider1><Login /></ThemeProvider1>} />
            <Route path='search/:s' element={<ThemeProvider1><SearchUser /></ThemeProvider1>} />
            {token.role === 'user' &&
              <>
                <Route path='/branch/edit/:id' element={<ThemeProvider1><EditBranch /></ThemeProvider1>} />
                <Route path='/myAccount' element={<ThemeProvider1><AppUser /></ThemeProvider1>} />
              </>
            }
            <Route path='/lightBox' element={<ImageModal />} />
            <Route path='/zman' element={<ZmanList />} />
            <Route path='/branch/:id' element={<BranchPublic />} />

            <Route path='/userInfo' element={<UserInfo />} />
            <Route path='/donation' element={<DonationsMain />} />
            <Route path={`/branches`}  element={<BranchUserList />} />
            <Route path='/donationSingle/:id' element={<ThemeProvider1><DonationSingle /></ThemeProvider1>} />
            <Route path='/contact' element={<ThemeProvider1><ContactPost /></ThemeProvider1>} />
            <Route path='/c' element={<ContactPage/>} />
          </Routes>

        </Box>
      </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppMain />} />
        </Routes>
        {token.role !=="admin"&&
        <Routes>
          <Route path="/*" element={<Footer />} />
        </Routes>
}
      </BrowserRouter>
    </ThemeProvider>
  )
}

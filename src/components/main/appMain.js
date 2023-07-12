import React from 'react'
import BranchUserList from '../main/branches/branchUserList'
import DonationsMain from '../main/donations/donationsMain'
import Zman from '../main/zmanim/zman'
import ContactPost from '../main/contactUser/contactPost'
import GalleryMain from '../main/galleryMain'
import Section from './section/section'

export default function AppMain() {
  
  return (
    <div className=' bg-body-tertiary'>
  
      <Section/>

      < BranchUserList />
      <DonationsMain />
      <GalleryMain />
      <div className=' container-fluid bg-body-tertiary' >
        <div className='container d-sm-flex p-2'>
          <ContactPost />
          <Zman />
        </div>
      </div>
    </div>
  )
}

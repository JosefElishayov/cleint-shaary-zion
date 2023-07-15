import React from 'react'
import BranchUserList from '../main/branches/branchUserList'
import DonationsMain from '../main/donations/donationsMain'
import Zman from '../main/zmanim/zman'
import ContactPost from '../main/contactUser/contactPost'
import GalleryMain from '../main/galleryMain'
import Section from './section/section'
import { Grid } from '@mui/material'

export default function AppMain() {

  return (
    <div className=' bg-body-tertiary'>


      <Section />

      < BranchUserList />
      <div className='container'>
        <DonationsMain />
      </div>
      <GalleryMain />

        <div className='bg-body-tertiary py-5 container justify-content-around d-sm-flex'>
          <div className='col-md-4'>
            <ContactPost />
          </div>
          <div className='col-md-4 mt-5 mt-md-0 '>
            <Zman />
          </div>

        </div>
   
    </div>
  )
}

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
  
      <Section/>

      < BranchUserList />
      <DonationsMain />
      <GalleryMain />
      <Grid className='py-5 bg-body-tertiary' container spacing={2} justifyContent="space-between" >
        <Grid item xs={12} sm={5}>
          <ContactPost />
          </Grid>
          <Grid  item xs={12} sm={5}>
          <Zman />
          </Grid>
        
        </Grid>
    </div>
  )
}

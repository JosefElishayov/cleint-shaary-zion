
import { Container, Grid } from '@mui/material'
import React from 'react'
import { backgroundBody } from './branches/styleMuiBranch'

export default function GalleryMain() {
    const galleryObj = [
        {
            name: "סרט שערי ציון עברית",
            link: "https://www.youtube.com/embed/tRXOmpydFx0"
        }, {
            name: "סרט שערי ציון אנגלית",
            link: "https://www.youtube.com/embed/8DBDB8SOnfI"
        }
    ]
    return (
        <div className='container-fluid' style={{background:backgroundBody}}>
            <div className='container'>
            <h2 className='text-center'>וידאו</h2>
            <Grid  container spacing={1} >
                {galleryObj.map((item, i) => (
                    <Grid  key={i} item xs={12} sm={6} textAlign={"center"}>
                        <iframe width="100%"  height="315" src={item.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </Grid>
                ))}
            </Grid>
            </div>
        </div>
    )
}

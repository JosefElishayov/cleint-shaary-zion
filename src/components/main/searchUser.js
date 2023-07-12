import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import { Link, useParams } from 'react-router-dom';
import { Pagination } from 'antd';
import { Grid } from '@mui/material';

export default function SearchUser() {
  const params = useParams()
  const [arrSearch, setArrSearch] = useState([])
  const [search, setSearch] = useState('')
  const [isDonation, setIsDonation] = useState(true)
  const [isBranch, setIsBranch] = useState(true)
  const [current, setCurrent] = useState(1);
  const [back, setBack] = useState(5);
  const [next, setNext] = useState(5);
  useEffect(() => {
    doApiSearch();
  }, [search])
  const doApiSearch = async () => {
    const url = API_URL + `/search?s=` + params["s"];
    try {
      const data = await doApiGet(url);
      console.log(data);
      setArrSearch(data)
    } catch (err) {
      console.log(err);
    }
  };
  const filterDonation = () => {
    setIsBranch(false)
    setIsDonation(true)
  }
  const filterBranch = () => {
    setIsBranch(true)
    setIsDonation(false)
  }
  const onChange = (page) => {

    setCurrent(page);
    setBack((page * 10) - 10)
    setNext(page * 10)
    if (page === 1) {
      setBack(5)
      setNext(5)
    }
  };
  return (
    <div className='container mt-5'>
      <div className='my-3 text-center'>
      <h1 >תוצאות חיפוש</h1>
      <button onClick={filterDonation}
        className='btn btn-info'>תרומות</button>
      <button onClick={filterBranch}
        className='btn btn-danger me-3'>סניפים</button>
        </div>
      {arrSearch.branch && arrSearch.donation ?
        <Grid container spacing={2} justifyContent="center">
          {isBranch &&
            <>
              {arrSearch.branch.slice(back - 5, next).map((item, i) => (
                <Grid key={i} item xs={12} sm={6}>
                  <Link className='list_search ' to={"/branch/" + item._id}>
                    <div className='border border-3 border-dark'>
                      <h4 className='bg-danger col-4 text-center'>סניפים</h4>
                      <div className='text-center'>
                        <h5 >{item.brunch_name} </h5>
                        <p >{item.city} </p>
                        <p >{item.manager} </p>
                        <p >{item.description} </p>
                        <p>{item.info.substring(0, 10)}... </p>
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </>
          }
          {isDonation &&
            <>
              {arrSearch.donation.slice(back - 5, next).map((item, i) => (
                <Grid key={i} item xs={12} sm={6}>
                  <Link className='list_search ' to={"/donationSingle/" + item.donations_Name}>
                    <div className='border border-3 border-dark'>
                      <h4 className='bg-info col-4 text-center'>תרומות</h4>
                      <div className='text-center'>
                        <h5 >{item.donations_Name} </h5>
                        <p >{item.info.substring(5, 10)} </p>
                      </div>
                    </div>
                  </Link>
                </Grid>
              ))}
            </>
          }
        </Grid> :""
     
     }
       {arrSearch.branch?
        <Pagination style={{ textAlign: "center", padding: "16px" }} current={current} onChange={onChange} total={(arrSearch.branch.length + arrSearch.donation.length)} />
    :   <h2 className='text-center'>לא מצאנו את מה שחיפשת</h2>
     }
    </div>
  )
}

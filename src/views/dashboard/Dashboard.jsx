import React, { useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
 
} from '@coreui/react'
import { axiosPrivate } from '../../util/request'


const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  
  useEffect(()=>{

    console.log('Dashboard');
    handleProducts();
  },[])

  const handleProducts = async ()=>{
    const prod = await axiosPrivate.get('/products');
    console.log(prod.data);
  }

  return (
    <>
    
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
       
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

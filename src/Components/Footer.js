import React from 'react'

//import { MDBFooter } from 'mdb-react-ui-kit';
//import { Link } from 'react-router-dom';


export default function Footer() {
  return (  
    <div>
      <div  className='text-center text-lg-left'>
      <div className='text-center p-3' >
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://saurabhjha.vercel.app/' target='_blank' rel='noopener noreferrer'>
            Visit Saurabh Jha's Site
        </a>

      </div>
    </div>
    </div>
  )
}


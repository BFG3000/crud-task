import * as React from 'react'
import { Link } from "react-router-dom";
import './styles.css'
const Home = () => {
    return (
        <div style={{ display: 'flex',justifyContent:'center',alignItems:'center',gap:'2rem' }}>
            <Link to='/employees' className='goodButton'>Employees</Link>
            <Link to='/departments' className='goodButton'>Departments</Link>
        </div>
    )
}

export default Home
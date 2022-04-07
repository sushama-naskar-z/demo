import React from 'react'
import { ReactComponent as Filters } from '../images/filters.svg'
import { ReactComponent as Search } from '../images/search.svg'
import {ReactComponent as AddBook} from '../images/addbook.svg'
import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav() {
  return (
    <div className='nav'>
        <div className='nav_left'>
        <Link to="/"  >
        <Filters className="nav_svg"/>
          </Link>
          </div>
        {/* <div className='nav_middle'>
            <input placeholder='Search'/>
            <Search className="nav_svg"/>
        </div> */}
        <div className='heading'>
          <h1>Mystery point books</h1>
        </div>
        <div className='nav_right'>
            {/* <div className='sign_in_text'>Sign in</div> */}
            <div>
            <Link to="/addBook"  >
              <AddBook className="nav_svg"/>
              </Link>
              </div>
        </div>
    </div>
  )
}

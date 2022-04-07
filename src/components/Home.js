import React from 'react'
import { Route } from 'react-router-dom'
import Booklist from './Booklist'
import Nav from './Nav'

export default function Home() {
  // const { navigate } = this.props.navigation;
  // console.log(navigate)
  return (
    <div>
      
        <Booklist/>
    </div>
  )
}

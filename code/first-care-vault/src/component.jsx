import React from 'react'
import Logo from './logo'

function Component({header,subHeader,logo}) {
  return (
    <main className='box'>
      <Logo logo={logo} /> 
      <div> {header}</div>
      <div> {subHeader}</div>
    </main>
  )
}
// 
export default Component
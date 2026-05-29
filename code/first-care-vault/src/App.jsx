import { useState } from 'react'
import { BiFirstAid } from 'react-icons/bi'
import "./index.css"
import { TbShieldCheck } from 'react-icons/tb'
import { IoIosDesktop } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import Component from './component'
import Logo from './logo'

function App() {
   return (
     <main>
       <section>
         <Logo logo={<BiFirstAid size={24} color="green" />} />
         <h1 className='heading'>Pharma-Vault</h1>
         <h5>Inventory management system</h5>
       </section>
       <section className="wrapper">
         <div className='card'>
           <Component
             className="box"
             header="Admin"
             subHeader="Full-access"
             logo={<TbShieldCheck size={24} color="green" />}
           />
           <Component
             className="box"
             header="Register"
             subHeader="POS terminal and payment-processing"
             logo={<IoIosDesktop size={24} color="orange" />}
           />
           <Component
             className="box"
             header="Customer"
             subHeader="Personal-orders"
             logo={<IoPersonOutline size={24} color="green" />}
           />
         </div>
       </section>
     </main>
   )
   }



export default App

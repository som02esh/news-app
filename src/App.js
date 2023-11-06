
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes} from "react-router-dom";
// 204dda4ab75b4ad38bcd25df0a91f893
export default class App extends Component {
 
  render() {
    return (
      <>
        <Navbar/>
        {/* <News pageSize={6} country="us" category="general"/> */}
        {/* {we give a unique key to all the news components so that it renders it whenever we click it} */}
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={15} country="in" category="general"/>}/>
          <Route exact path="/business" element={<News key="business" pageSize={6} country="in" category="business"/>}/>   
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment"/>}/>  
          <Route exact path="/health" element={<News key="health" pageSize={6} country="in" category="health"/>}/>  
          <Route exact path="/science" element={<News key="science" pageSize={6} country="in" category="science"/>}/>  
          <Route exact path="/sports" element={<News key="sports" pageSize={6} country="in" category="sports"/>}/>  
          <Route exact path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology"/>}/>         
        </Routes>
        </>
    )
  }
}




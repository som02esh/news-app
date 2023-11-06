import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description,image,newsUrl,author,date,source}=this.props
    return (
      <div className='my-3'>
        <div className="card" >
         <img src={!image? "https://image.cnbcfm.com/api/v1/image/107327243-1698864973814-gettyimages-1757875748-PELOTON_EARNS.jpeg?v=1698865111&w=740&h=416&ffmt=webp&vtcrop=y" : image} className="card-img-top" alt="..."/>
          <div className="card-body">
             <h5 className="card-title">{title}...<span class="badge bg-danger rounded-pill">{source}</span></h5>
             <p className="card-text">{description}...</p>
             <p className="card-text"><small className="text-muted">By {author ? author :"unknown"} on {new Date(date).toGMTString()}</small></p>
             <a href={newsUrl} className="btn btn-dark btn-sm" target="_blank" rel="noreferrer">Read More</a>
          </div>
        </div>
      </div>
      
    )
  }
}

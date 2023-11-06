import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps={
    country:'us',
    pageSize:6,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  capitalizeFirstLetter=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
  }
  // contructor runs before render also
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:false,
      page:1
    }
   
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
// componentDidMound is a predefined method. it runs after the component output has been rendered to the dom
async componentDidMount(){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=204dda4ab75b4ad38bcd25df0a91f893&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  let parsedData=await data.json();
  // console.log(parsedDatap)
  this.setState({
    articles:parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false
  })
}

handleNextclick=async ()=>{
  if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)))
  {
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=204dda4ab75b4ad38bcd25df0a91f893&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  let parsedData=await data.json();
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles,
    loading:false
})
  }
}
handlePrevclick=async ()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=204dda4ab75b4ad38bcd25df0a91f893&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  let parsedData=await data.json();
  this.setState({
    page:this.state.page-1,
    articles:parsedData.articles,
    loading:false
})
}

  render() {
    return (
      <div className='container my-3'>
       <h2 className='text-center' style={{margin:"35px"}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner/>}
        {/* {this.state.articles.map((element)=>{console.log(element)})} */}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title ? element.title.slice(0,40) : ""} description={element.description ? element.description.slice(0,88) : ""} image={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark " onClick={this.handlePrevclick}>&larr; Previous</button>
        <button type="button" disabled={(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))} className="btn btn-dark " onClick={this.handleNextclick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

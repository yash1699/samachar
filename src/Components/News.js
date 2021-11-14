import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import NoArticles from './NoArticles';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalResults, setTotalResults] = useState(0)
    

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    props.category !== 'general' ? (props.category !== '' ? document.title = `Samachar | ${capitalizeFirstLetter(props.category)}`: document.title = `Samachar` ) : document.title = 'Samachar | Home'

    const updateNews = async () => {
        props.setProgress(20)
        let newUrl = `http://api.mediastack.com/v1/news?access_key=${props.apiKey}&countries=${props.country}&categories=${props.category}&limit=${props.pageSize}&offset=${page}`
        if(props.keyword)
            newUrl = newUrl.concat(`&keywords=${props.keyword}`)
        setLoading(true)
        props.setProgress(50)
        let data = await fetch(newUrl)
        props.setProgress(70)
        let parsedData = await data.json()
        props.setProgress(80)
        setArticles(parsedData.data)
        setTotalResults(parsedData.pagination.total)
        props.setProgress(90)
        setPage(page+props.pageSize+1)
        setLoading(false)
        props.setProgress(100)
    }

    const fetchMoreData = async () => {
        if(page>totalResults)
            return;
        let newUrl = `http://api.mediastack.com/v1/news?access_key=${props.apiKey}&countries=${props.country}&categories=${props.category}&limit=${props.pageSize}&offset=${page}`
        if(props.keyword)
            newUrl = newUrl.concat(`&keywords=${props.keyword}`)
        let data = await fetch(newUrl);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.data))
        setTotalResults(parsedData.pagination.total)
        setPage(page+props.pageSize+1)
    };

    useEffect(() => {
        updateNews()
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <h1 className='text-center' style={{marginTop: '75px'}}>Samachar - Top {props.category !== 'general' ? `${capitalizeFirstLetter(props.category)} headlines` : 'headlines'}</h1>
            {loading && <Spinner />}
            {articles.length>0?
            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
        >
            <div className="container">
                <div className="row">
                    {articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.image} newsUrl={element.url} author={element.author} date={element.published_at} source={element.source} />
                        </div>
                    })}
                </div>
            </div>
        </InfiniteScroll>:
        <NoArticles/>}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: "general",
    
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News



// const updateNews = async () => {
//     props.setProgress(20)
//     const newUrl = `http://api.mediastack.com/v1/news?access_key=${props.apiKey}&countries=${props.country}&category=${props.category}&limit=${props.pageSize}&offset=${page}`
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
//     setLoading(true)
//     props.setProgress(50)
//     let data = await fetch(url)
//     props.setProgress(70)
//     let parsedData = await data.json()
//     props.setProgress(80)
//     setArticles(parsedData.articles)
//     setTotalResults(parsedData.totalResults)
//     props.setProgress(90)
//     setPage(page+1)
//     setLoading(false)
//     props.setProgress(100)
// }


// const fetchMoreData = async () => {
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     setArticles(articles.concat(parsedData.articles))
//     setTotalResults(parsedData.totalResults)
//     setPage(page + 1)
// };
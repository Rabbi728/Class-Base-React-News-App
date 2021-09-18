import { useState, useEffect } from 'react'
import Loader from '../layouts/Loader';
import Info from './Info'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function List(props) {
    const [article, setArticle] = useState([])
    const [pageItem] = useState(6)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title = wordCapitalize(props.category) + " - News App";
        fetchArticleDatas()
        // eslint-disable-next-line
    }, [])

    const wordCapitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const fetchArticleDatas = async () => {
        props.setProgress(10)
        setLoading(true)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${pageItem}&page=${page}`;
        let res = await fetch(url);
        props.setProgress(30)
        let data = await res.json();
        props.setProgress(70)
        setArticle(data.articles)
        setTotalResults(data.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    const fetchMoreData = async () => {
        setPage(page + 1)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${pageItem}&page=${page+1}`;
        await fetch(url)
            .then((res) => res.json())
            .then(function (data) {
                setArticle(article.concat(data.articles))
                setTotalResults(data.totalResults)
            }
            );
    }

    // const loadAfterClickPagination = (pageNumber) => {
    //     setPage(pageNumber)
    //     fetchArticleDatas();
    // }

    return (
        <>
            <h2 className="my-4 text-center">Top Headline From {wordCapitalize(props.category)}</h2>
            {loading && <Loader />}
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalResults}
                loader={<Loader />}
            >
                <div className="container">
                    <div className="row mb-5">

                        {article.map((el) => {
                            return <div key={el.url} className="col-md-4">
                                <Info details={el} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* {!loading && totalResults > 0 && <Pagination loadData={loadAfterClickPagination} page={page} pageItem={pageItem} totalResults={totalResults}/>} */}
        </>
    )
}

import React, { Component } from 'react'
import Loader from '../layouts/Loader';
import Info from './Info'
import InfiniteScroll from 'react-infinite-scroll-component';
// import Pagination from '../layouts/Pagination';

export class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            pageItem: 6,
            page: 1,
            totalResults: 0,
            loading: false,
            hasMore: false,
        }
        document.title = this.wordCapitalize(props.category) + " - News App"
    }

    wordCapitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    fetchArticleDatas = async () => {
        this.props.setProgress(10)
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${this.state.pageItem}&page=${this.state.page}`;
        let res = await fetch(url);
        this.props.setProgress(30)
        let data = await res.json();
        this.props.setProgress(70) 
        this.setState({
            article: data.articles,
            totalResults: data.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${this.state.pageItem}&page=${this.state.page}`;
        await fetch(url)
            .then((res) => res.json())
            .then((data) =>
                this.setState((state, props) => ({
                    article: state.article.concat(data.articles),
                    totalResults: data.totalResults,
                }))
            );
    }

    loadAfterClickPagination = (pageNumber) => {
        this.setState({ page: pageNumber })
        this.fetchArticleDatas();
    }

    componentDidMount() {
        this.fetchArticleDatas();
    }

    render() {
        return (
            <>
                <h2 className="my-4 text-center">Top Headline From {this.wordCapitalize(this.props.category)}</h2>
                {this.state.loading && <Loader />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row mb-5">

                            {this.state.article.map((el) => {
                                return <div key={el.url} className="col-md-4">
                                    <Info details={el} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* {!this.state.loading && this.state.totalResults > 0 && <Pagination loadData={this.loadAfterClickPagination} page={this.state.page} pageItem={this.state.pageItem} totalResults={this.state.totalResults}/>} */}
            </>
        )
    }
}

export default List

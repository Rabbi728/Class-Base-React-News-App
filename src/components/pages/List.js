import React, { Component } from 'react'
import Loader from '../layouts/Loader';
import Pagination from '../layouts/Pagination';
import Info from './Info'

export class List extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            article     : [],
            pageItem    : 6,
            page        : 1,
            totalResults: 0,
            loading     : false
        }
        document.title = this.wordCapitalize(props.category)+ " - News App"
    }

    wordCapitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    fetchArticleDatas = async () => {
        this.setState({loading : true})
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f283e6a592664325bd97a57fdffec091&pageSize=${this.state.pageItem}&page=${this.state.page}`;
        await fetch(url)
            .then((res) => res.json())
            .then((data) => 
                this.setState((state, props)=>({
                    article     : data.articles,
                    totalResults: data.totalResults,
                    loading     : false
                }))
            );
    }

    loadAfterClickPagination = (pageNumber) => {
        this.setState({page : pageNumber})
        this.fetchArticleDatas();
    }

    componentDidMount() {
        this.fetchArticleDatas();
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="my-3">News Headline --</h1>
                {this.state.loading && <Loader/>}
                {!this.state.loading && this.state.article && <div className="row mb-5">
                    {this.state.article.map((el) =>{
                        return  <div key={el.url} className="col-md-4">
                                    <Info details={el} />
                                </div>
                    })}
                </div>}
                {!this.state.loading && this.state.totalResults > 0 && <Pagination loadData={this.loadAfterClickPagination} page={this.state.page} pageItem={this.state.pageItem} totalResults={this.state.totalResults}/>}
            </div>
        )
    }
}

export default List

import React, { Component } from 'react'

export default class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            totalPage : 0
        }
    }
    componentDidMount() {
        this.setState({
            totalPage : Math.ceil(this.props.totalResults/this.props.pageItem)
        })
    }
    prevButtonClick = ()=> {
        this.props.loadData(this.props.page - 1)
    }

    nextButtonClick = ()=> {
        this.props.loadData(this.props.page + 1)
    }

    buttons = ()=> {
        let buttons = [];
        for (let index = 1; index <= this.state.totalPage; index++) {
            buttons[index] = index; 
        }
        return buttons;
    }

    clickedPageNumber = (number)=> {
        this.props.loadData(number)
    }

    render() {
        return (
            <nav aria-label="Page navigation example my-5">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button type="button" disabled={this.props.page<=1} onClick={this.prevButtonClick} className="page-link bg-dark text-white">Previous</button>
                    </li>
                    {this.buttons().map((number)=>{
                        return <li key={number} className="page-item">
                                    <button type="button" onClick={()=> this.clickedPageNumber(number)} className={'page-link' + (this.props.page === number ? ' bg-primary text-white' : ' bg-light' ) }>
                                        {number}
                                    </button>
                                </li>
                    })}
                    <li className="page-item">
                        <button type="button" disabled={this.props.page + 1 > this.state.totalPage} onClick={this.nextButtonClick} className="page-link bg-dark text-white">Next</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

import React, { Component } from 'react'

export class Info extends Component {
    render() {
        let {author, publishedAt} = this.props.details;
        return (
            <div className="card">
                <img src={this.props.details.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{this.props.details.title}</h5>
                    <p className="card-text">{this.props.details.description}</p>
                    <p className="card-text"><small className="text-muted">By {author??'Unknown'} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={this.props.details.url} className="btn btn-dark">Read More</a>
                </div>
            </div>
        )
    }
}

export default Info

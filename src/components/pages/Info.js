export default function Info(props) {
    let { author, publishedAt } = props.details;
    return (
        <div className="card">
            <img src={props.details.urlToImage} className="card-img-top" alt="hi" />
            <div className="card-body">
                <h5 className="card-title">{props.details.title}</h5>
                <p className="card-text">{props.details.description}</p>
                <p className="card-text"><small className="text-muted">By {author ?? 'Unknown'} on {new Date(publishedAt).toGMTString()}</small></p>
                <a href={props.details.url} className="btn btn-dark">Read More</a>
            </div>
        </div>
    )
}

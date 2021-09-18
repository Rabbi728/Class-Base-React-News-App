import { useEffect, useState } from 'react'

export default function Pagination(props) {
    const [totalPage, setTotalPage] = useState(0)
    const prevButtonClick = () => {
        props.loadData(props.page - 1)
    }
    const nextButtonClick = () => {
        props.loadData(props.page + 1)
    }
    const buttons = () => {
        let buttons = [];
        for (let index = 1; index <= this.state.totalPage; index++) {
            buttons[index] = index;
        }
        return buttons;
    }

    const clickedPageNumber = (number) => {
        props.loadData(number)
    }

    useEffect(() => {
        setTotalPage(Math.ceil(props.totalResults / props.pageItem))
    }, [])

    return (
        <nav aria-label="Page navigation example my-5">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button type="button" disabled={props.page <= 1} onClick={prevButtonClick} className="page-link bg-dark text-white">Previous</button>
                </li>
                {buttons().map((number) => {
                    return <li key={number} className="page-item">
                        <button type="button" onClick={() => clickedPageNumber(number)} className={'page-link' + (props.page === number ? ' bg-primary text-white' : ' bg-light')}>
                            {number}
                        </button>
                    </li>
                })}
                <li className="page-item">
                    <button type="button" disabled={props.page + 1 > totalPage} onClick={nextButtonClick} className="page-link bg-dark text-white">Next</button>
                </li>
            </ul>
        </nav>
    )
}
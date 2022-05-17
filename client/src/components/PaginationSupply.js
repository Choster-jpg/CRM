import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationSupply = observer(() => {
    const {supply} = useContext(Context);
    const pageCount = Math.ceil(supply.totalCount / supply.limit);
    let pages = [];

    for(let i = 0; i < pageCount; i++)
    {
        pages.push(i+1);
    }

    return (
        <Pagination color="green">
            {
                pages.map(page =>
                    <Pagination.Item active={supply.page == page} key={page} onClick={() => supply.setPage(page)}>
                        {page}
                    </Pagination.Item>
                )
            }
        </Pagination>
    );
});

export default PaginationSupply;
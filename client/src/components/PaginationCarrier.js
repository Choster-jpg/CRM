import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationCarrier = observer(() => {
    const {carrier} = useContext(Context);
    const pageCount = Math.ceil(carrier.totalCount / carrier.limit);
    let pages = [];

    for(let i = 0; i < pageCount; i++)
    {
        pages.push(i+1);
    }

    return (
        <Pagination color="green">
            {
                pages.map(page =>
                    <Pagination.Item active={carrier.page == page} key={page} onClick={() => carrier.setPage(page)}>
                        {page}
                    </Pagination.Item>
                )
            }
        </Pagination>
    );
});

export default PaginationCarrier;
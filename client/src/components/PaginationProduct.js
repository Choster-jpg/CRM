import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationProduct = observer(() =>
{
    const {product} = useContext(Context);
    const pageCount = Math.ceil(product.totalCount / product.limit);
    let pages = [];

    for(let i = 0; i < pageCount; i++)
    {
        pages.push(i+1);
    }

    return (
        <Pagination color="green">
            {
                pages.map(page =>
                    <Pagination.Item active={product.page == page} key={page} onClick={() => product.setPage(page)}>
                        {page}
                    </Pagination.Item>
                )
            }
        </Pagination>
    );
});

export default PaginationProduct;
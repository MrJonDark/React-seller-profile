import _ from 'lodash';


export function Paginate (product,currentPage,pageSize)  {
    const startIndex = (currentPage-1)* pageSize
    return _(product).slice(startIndex).take(pageSize).value();
}
 

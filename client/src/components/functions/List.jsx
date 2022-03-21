import React from 'react';

const GroupList = (props) => {
    const { allProducts, items, testProp, valueProp, selected, ItemSelect } = props;

    return (<ul className='list_group'>
       


        {items.map((item,index) =>  <li key={item.id} className={item === selected  ? 'list-group selected' : 'list-group'} key={item[valueProp]}><a onClick={() => ItemSelect(item)}>{item.attributes.name_en} </a></li>)}


    </ul>);
}

export default GroupList;
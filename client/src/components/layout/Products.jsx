import React, { Component } from "react";
import { getProducts ,updateStatus ,apiDeleteProduct} from "../../service/Products";
import { getCategories ,getSubCategories } from "../../service/Categories";
import { Pagination } from "../functions/pagination";
import { Paginate } from "../functions/paginate_data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import GroupList from "../functions/List";
import ProductTable from './ProductsTable/Table';
import _ from 'lodash';

class Products extends Component {
    state = {
        products: [],
        pageSize: 10,
        currentPage: 1,
        categories: [],
        Sorting: {
            path: 'title',
            order: 'asc'
        }
        
    };
    async componentDidMount() {
        this.setState({ products: await getProducts()})
        this.setState({ categories: await getSubCategories() },()=>{
       if(this.state.categories){
        if(this.state.categories.length >0)   this.setState({ selectedList:this.state.categories[0]})
       } 
        })

    }
    handlePaginate = (page) => {
        this.setState({ currentPage: page });
    };
    groupSelect = async (list) => {
        this.setState({ selectedList: list ,currentPage: 1 });
        this.setState({products:await getProducts(list)},()=>{
        })
        

    };
    handleSort = (Sorting) => {

        this.setState({ Sorting })
    }

    changeStatus=async (product)=>{
        const products =this.state.products
       const index= products.findIndex(prod=> prod.id == product.id)
      
       products[index].attributes.is_available = !product.is_available
    
        this.setState({products:products})
      await updateStatus({product:{status:product.is_available ,id:product.id }})

    }
    deleteProduct= async (id)=>{
     const deleteConfirm=    window.confirm("Are you sure");
     const products=this.state.products
     if(deleteConfirm == true){
       const  updatedProducts = products.filter(product=> product.id != id)
       this.setState({products:updatedProducts})
            await apiDeleteProduct(id)
     }
    }
    render() {

        const {
            products: allProduct,
            pageSize,
            currentPage,
            categories,
            selectedList,
            Sorting
        } = this.state;
        const FilterList = allProduct;
        if(allProduct.length > 0){
            const products = Paginate(FilterList, currentPage, pageSize);

        return (
            <div className='w-75 m-auto'>
                <h3 className='text-left mt-4 p-4'>Manage Products</h3>
            <div className="card ml-auto mr-auto mt-4 p-4    card_background">
            <div className="table-responsive">
                <GroupList
                    allProducts={allProduct}
                    items={categories}
                    testProp="name"
                    valueProp="id"
                    selected={selectedList}
                    ItemSelect={this.groupSelect}
                />

                <ProductTable deleteProduct={this.deleteProduct} changeStatus={this.changeStatus} products={products} sort={Sorting} onSort={this.handleSort} />


                <Pagination
                    currentPage={currentPage}
                    handlePaginat={this.handlePaginate}
                    pageSize={pageSize}
                    products_count={FilterList.length}
                />
            </div>
            </div>
            </div>
        );
      }
      else{
          return(
            <div className='w-75 m-auto'>
            <h3 className='text-left mt-4 p-4'>Manage Products</h3>
        <div className="card ml-auto mr-auto mt-4 p-4    card_background">
            <h1>You donot have any product to show</h1>
            </div></div>
          )
      }
       
    }
}
export default Products;

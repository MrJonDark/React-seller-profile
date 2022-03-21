import React, { createRef, Component } from "react";
import { editStocks } from "../../service/stocks";


export default class Modal extends Component {
    state = {
        id: this.props.stock.id,
        size: this.props.stock.attributes.size,
        quantity: this.props.stock.attributes.quantity,
        size_id:this.props.stock.attributes.size_id
    }
    changeValue = e => {


        this.setState({ quantity: e.currentTarget.value });
    }
    
    componentWillUpdate(nextProps, nextState){
 
      if(nextProps.stock.attributes.size !== nextState.size ){
          this.setState({
            size: this.props.stock.attributes.size,
            quantity: this.props.stock.attributes.quantity,
          })
      }

    }
    handle_submit = e => {
        e.preventDefault();
        const stock = { ...this.state }
    
        editStocks(stock)
    }

    render() {

        

        return (
            <div className="modal fade" id={this.props.modal} tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
                            <button type="button" className="close" id='close_model' data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.stock.attributes &&
                                <form onSubmit={this.handle_submit}>
                                    <input type="hidden" value={this.state.id} name='id' />
                                    <div className="form-group d-flex justify-content-around">
                                      <div>
                                      <label htmlFor="Size">Size</label>
                                        <input  type="text" disabled className="form-control" id="Size" name='size' aria-describedby="emailHelp" value={this.state.size} />

                                      </div>
                                        <div>
                                        <label htmlFor="Qty">Qty</label>
                                         <input  type="text" className="form-control" id="Qty" aria-describedby="emailHelp" onChange={this.changeValue} name='quantity' value={this.state.quantity} />
                                                                        
                                        </div>
                                      </div>


                                    <button type="submit" className="btn btn-primary" onClick={()=>{this.props.getstock(this.props.index,[this.state.size,this.state.quantity,this.state.id,this.state.size_id]);document.getElementById(this.props.modal).click();}} >Save changes</button>
                                </form>
                            }
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


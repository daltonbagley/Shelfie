import React, {Component} from "react"
import Product from '../Product/Product'
import './Dashboard.css'
import axios from 'axios'
export default class Dashboard extends Component{
constructor(props){
   super(props)
   this.state = {
       test: ""
   }
}

deleteProduct = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3001/api/product/${id}`).then(this.props.getInventory)
    console.log(this.state.test)
  }
// deleteProduct (id) {
//     axios.delete(`http://localhost:3001/api/product/${id}`).then(console.log(this.props.getInventory))
//   }
handleEditClick = (id) => {
    this.props.setSelected(id)
    this.props.toggleEditFLG(true)
    console.log(this.props.productid)
}
    render(){
        return(
            <div className="Main">Dashboard Component
                
                {this.props.inventoryList.map((product)=>
                <Product key={product.productid} 
                         id={product.productid} 
                         url={product.productimageurl}
                         name={product.productnm} 
                         price={product.productpricenbr} 
                         deleteProduct={this.deleteProduct} 
                         setSelected={this.props.setSelected}
                         handleEditClick={this.handleEditClick}
                         toggleEditFLG={this.props.toggleEditFLG}/> )}
                
                 
            </div>
            
        )
    }
}
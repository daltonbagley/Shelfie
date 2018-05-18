import React, {Component} from "react"
import './Form.css'
import axios from 'axios'

export default class Form extends Component{
    constructor(props){
        super(props)
        this.state = {
            url: '',
            name: '',
            price: '',
            selectedId: ''
        }
    }

    clearInputs = () => {
        this.setState({url:'', name:'', price:'', selectedId: ''})
        this.props.toggleEditFLG(false)
        this.props.resetSelected()
    
    }
    newProduct = () => {
       let newProductObj = {
        productnm: this.state.name,
        productimageurl: this.state.url,
        productpricenbr: this.state.price
       } 
       console.log(newProductObj)
       if(this.state.name!==''||this.state.url!==''||this.state.price!==''){
       axios.post('http://localhost:3001/api/product/', newProductObj).then(this.props.getInventory, this.clearInputs())
       }
    }

      componentDidUpdate(oldProps){
          let {productid, productnm, productpricenbr, productimageurl} = this.props.selected;
             if(this.props.editFLG){
                 this.setState({selectedId: productid, name: productnm, price: productpricenbr, url:productimageurl})
                 this.props.toggleEditFLG(false)
             }
      }

      handleEdit = () => {
          let edited = {
            productnm: this.state.name,
            productimageurl: this.state.url,
            productpricenbr: this.state.price
          }
        axios.put(`http://localhost:3001/api/product/${this.state.selectedId}`, edited).then(this.props.getInventory, this.clearInputs())
      }

    render(){
     if(this.state.selectedId!==''){
        return(
            <div className = "Main">
                <div className="InputsContainer">
                    <input type="text" placeholder="img url" value={this.state.url} onChange={(e)=>{
                        this.setState({url: e.target.value}
                        ,()=>console.log(this.state.url))
                    }}/>
                    <input type="text" placeholder="name" value={this.state.name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }}/>
                    <input type="text" placeholder="price" value={this.state.price} onChange={(e)=>{
                        this.setState({price: e.target.value})
                    }}/>
                    
                    <button onClick={()=>this.handleEdit()}>SAVE</button>
                    <button onClick={()=>this.clearInputs()}>CANCEL</button>
                    
                </div>
            </div>
        )
    } else {
        return(
            <div className = "Main">
                <div className="InputsContainer">
                    <input type="text" placeholder="img url" value={this.state.url} onChange={(e)=>{
                        this.setState({url: e.target.value}
                        ,()=>console.log(this.state.url))
                    }}/>
                    <input type="text" placeholder="name" value={this.state.name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }}/>
                    <input type="text" placeholder="price" value={this.state.price} onChange={(e)=>{
                        this.setState({price: e.target.value})
                    }}/>
                
                    <button onClick={()=>this.newProduct()}>ADD</button>
                    <button onClick={()=>this.clearInputs()}>CANCEL</button>
                    
                </div>
            </div>
        )
    }
  }
}
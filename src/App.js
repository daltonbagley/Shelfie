import React, { Component } from 'react';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard'
import Form from './Component/Form/Form'
import Header from './Component/Header/Header'
//import Product from './Component/Product/Product'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/inventory/'

class App extends Component {
  constructor(){
    super()
    this.state={
        inventory: [],
        selected: {},
        editFLG: false
    }
  }

  componentWillMount(){
    this.getInventory()
  }

  getInventory = () => {
    axios.get(baseUrl).then(res => 
      this.setState({inventory: res.data})
      )
  }

  setSelected = (id) =>{
    let index = this.state.inventory.findIndex(product => id == product.productid)
   // console.log(index)
    let product = this.state.inventory[index]
    //console.log(product)
    this.setState({selected: product})
   //console.log(this.state.selected)
  }

  resetSelected = () => {
    this.setState({selected: {}})
  }
  toggleEditFLG = (inp) => {
    if(inp === true){
      this.setState({editFLG: true})
    }else if(inp === false){
      this.setState({editFLG: false})
    } else {console.log("Bad Input")}
  }

  

  render() {
    return (
      <div className="App">
        <div className = "Header">
         <Header/>
        </div>

        <div className="MainBody">
          <div className="DashboardContainer">
            <Dashboard inventoryList={this.state.inventory} 
                      deleteProduct={this.deleteProduct} 
                      getInventory={this.getInventory} 
                      setSelected={this.setSelected} 
                      toggleEditFLG={this.toggleEditFLG}/>
          </div>

          <div className="FormContainer">
            <Form getInventory = {this.getInventory} 
                  selected={this.state.selected} 
                  editFLG={this.state.editFLG} 
                  toggleEditFLG={this.toggleEditFLG} 
                  resetSelected={this.resetSelected}/>
          </div>
        </div>
       

      </div>
    );
  }
}

export default App;

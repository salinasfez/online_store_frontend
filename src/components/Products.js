import React, {Component} from 'react';
import './Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


class Products extends Component {
    state = {
        products: [],
        formInputs: {
            name: '',
            price: '',
            description: '',
            image: ''
          },
        isInEditMode: false
    }
    componentDidMount(){
        this.getProducts();
    }
    getProducts = () => {
        fetch('https://merchant-clothing-co-app-api.herokuapp.com/products')
        .then(response => response.json())
        .then(json => this.setState({products: json}))
        .catch(error => console.log(error));
    }
    handleChange = (event) => {
        const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
        this.setState(updateInput)
        // console.log(event.target.value)
      }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://merchant-clothing-co-app-api.herokuapp.com/products', {
            body: JSON.stringify(this.state.formInputs),
            method: 'POST',
            headers: {
                'Accept' : 'application/json, text/plain, */*',
                'Content-Type' : 'application/json'
            }
        })
        .then(createdProduct => {
            return createdProduct.json()
        })
        .then(jsonedProduct => {
            this.setState({
                formInputs: {
                    name: '',
                    price: '',
                    description: '',
                    image: ''
                },
                products: [jsonedProduct, ...this.state.products]
            })
        })
        .catch(error => console.log(error));
      }
      deleteProduct = (id, index) => {
        fetch('https://merchant-clothing-co-app-api.herokuapp.com/products/' + id, {
          method: 'DELETE'
        })
        .then(() => {
          this.setState({
            products: [...this.state.products.slice(0, index), ...this.state.products.slice(index + 1)]
          });
        });
      }
    render(){
        return(
            <div className='main-container'>
                <h1 className='header'>Merchant Clothing Co.</h1>
                <div className='header-container'>
                <div className='form'>
                        <h2 id='list-an-item'>List an item</h2><br />
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor='name'>&nbsp;Item</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type='text' id='name' value={this.state.formInputs.name} onChange={this.handleChange}/>
                            <label htmlFor='price'>&nbsp;&nbsp;Price</label>&nbsp;&nbsp;
                            <input type='number' id='price' value={this.state.formInputs.price} onChange={this.handleChange} /><br/><br/>
                            <label htmlFor='description'>&nbsp;&nbsp;Description</label>&nbsp;&nbsp;
                            <input type='text' id='description' value={this.state.formInputs.description} onChange={this.handleChange}/>
                            <label htmlFor='image'>&nbsp;&nbsp;Image</label>&nbsp;&nbsp;
                            <input type='text' id='image' value={this.state.formInputs.image} onChange={this.handleChange}/><br/><br/>
                            <Button variant="primary" id='button' type="submit">
                            Submit
                            </Button>
                        </form>
                    </div>
                    <div className='for-him-her'>
                        
                        <Button className='two-buttons'>For Him</Button>
                        <Button className='two-buttons'>For Her</Button>
                    </div>
                </div>
                <section className='products'>
                    
                    {/* {this.state.formInputs.name} */}
                    {this.state.products.map((product, index) => {
                        return( 
                            <div className='product-card'>
                                <div className='product-image'>
                                    <img src={product.image} alt=''/>
                                </div>
                                <div className='product-info'>
                                    <h4>{product.name}</h4>
                                    <h5>${product.price}</h5>
                                    <h6 onClick={() => this.deleteProduct(product.id, index)}>Remove Item</h6>
                                </div>
                            </div>    
                            )
                    })}
                </section>
                <footer className='footer-container'>
                    <ul className='footer-item'>
                        <li>About us</li>
                        <li>Locations</li>
                        <li>Contact Us</li>
                    </ul>
                    <ul className='footer-item'>
                        <li>Careers</li>
                        <li>Promotions</li>
                        <li>Special Pricing</li>
                    </ul>
                    <ul className='footer-item'>
                        <li>Credit Card</li>
                        <li>Employee Log In</li>
                        <li>Manager Log In</li>
                    </ul>
                </footer>
            </div>
            
        )
    }
}

export default Products;
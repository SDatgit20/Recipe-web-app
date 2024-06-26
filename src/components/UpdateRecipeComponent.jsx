import React, { Component } from 'react';
import ItemService from '../service/ItemService';

class UpdateItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: ''
        };

        // binding item-name event handlers into constructor
        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);

        // binding item-description event handlers into constructor
        this.changeItemDescriptionHandler = this.changeItemDescriptionHandler.bind(this);

        // binding saveItem event handler (Add Item button)
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidCatch(){
        ItemService.getItemById(this.state.id).then((res) => {
            let item = res.data;
            this.setState({name: item.name, description: item.description});
        });
    }

    // event handler for name field
    changeItemNameHandler=(event)=>{
        this.setState({name: event.target.value});
    }

    // event handler for description field
    changeItemDescriptionHandler=(event)=>{
        this.setState({description: event.target.value});
    }

    // save employee method --> gets called whenver we hit Add Item button (submit the form)
    updateItem = async (e) => {
        e.preventDefault();
        let item = { name: this.state.name, description: this.state.description };
        console.log('item =>', item);
      
        try {
          await ItemService.addItem(item);
          window.location.href = '/items';
        } catch (error) {
          console.error(error);
        }
      }

    render() {
        return (
            <div>
                <div className="container p-5">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className='add-title'>Add Item</h3>
                            <div className="card-body">
                                <form action="">
                                    <div className="form-group mb-3">
                                        <label>Item Name</label>
                                        <input type="text" placeholder='Item Name' name='name' className='form-control'
                                        value={this.state.name} onChange={this.changeItemNameHandler} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Item Description</label>
                                        <input type="text" placeholder='Item Description' name='description' className='form-control'
                                        value={this.state.description} onChange={this.changeItemDescriptionHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.updateItem}>Add Item</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateItemComponent;
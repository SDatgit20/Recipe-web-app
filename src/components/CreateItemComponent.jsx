import React, { Component } from 'react';
import ItemService from '../service/ItemService';

class CreateItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            uploadedImage: null,
        };

        // binding item-name event handlers into constructor
        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);

        // binding item-description event handlers into constructor
        this.changeItemDescriptionHandler = this.changeItemDescriptionHandler.bind(this);

        // binding saveItemImage event handler (Add Item Image)
        this.handleDrop = this.handleDrop.bind(this);

        // binding saveItem event handler (Add Item button)
        this.saveItem = this.saveItem.bind(this);

        // binding cancel method
        // this.cancel = this.cancel.bind(this);
    }

    // event handler for name field
    changeItemNameHandler=(event)=>{
        this.setState({name: event.target.value});
    }

    // event handler for description field
    changeItemDescriptionHandler=(event)=>{
        this.setState({description: event.target.value});
    }

    handleDrop(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if(file){
            console.log("file here------->")
        }
        if(file){
            console.log("file not here------->")
        }
        this.setState({ uploadedImage: file });
    }
    // // cancel method --> once clicked it will navigate to item list page
    // cancel(){
    //     this.props.history.push('/items');
    // }

    // save employee method --> gets called whenver we hit Add Item button (submit the form)
    saveItem = async (e) => {
        e.preventDefault();
        let item = { name: this.state.name, description: this.state.description, uploadedImage: this.state.uploadedImage };
        console.log('item =>', item.name);
      
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
                <h3 className='text-center'>Add Item</h3>
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
                        <div className="form-group mb-3">
                            <label>Upload Image</label>
                            <div className="dropbox" onDrop={this.handleDrop} onDragOver={this.allowDrop}>
                                Drop image here or click to select
                                <input type="file" name="image" className="form-control-file" onChange={this.handleDrop} />
                            </div>
                        </div>
                        <button className='btn btn-success' onClick={this.saveItem}>Add Item</button>
                        {/* <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button> */}
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

        );
    }
}

export default CreateItemComponent;
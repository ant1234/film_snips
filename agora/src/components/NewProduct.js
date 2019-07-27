import React from "react";
import { PhotoPicker } from "aws-amplify-react";
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

class NewProduct extends React.Component {

  state = {
    description: "",
    price: "",
    shipped: false
  };

  handleAddProduct = () => {
    console.log("product added!");
  };

  render() {

    const { shipped } = this.state;

    return (
      <div className="flex-center">
        <h2 className="header">Add New Market Product</h2>
        <div>
          <Form className="market-header">

            <Form.Item label="Add Product Description">
              <Input
                type="text"
                icon="information"
                placeholder="description"
                onChange={description => this.setState({ description })}
              />
            </Form.Item>

            <Form.Item label="Set Product Price">
              <Input
                  type="number"
                  icon="plus"
                  placeholder="price ($NZ)"
                  onChange={price => this.setState({ price })}
              />
            </Form.Item>

            <Form.Item>
              <div className="text-center">
                <Radio
                  value="true"
                  checked={shipped === true}
                  onChange={() => this.setState({shipped:true})}
                >
                  Shipped
                </Radio>
                <Radio
                    value="false"
                    checked={shipped === false}
                    onChange={() => this.setState({shipped:false})}
                >
                  Emailed
                </Radio>
              </div>
            </Form.Item>

            <Form.Item>
              <PhotoPicker/>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={this.handleAddProduct}
              >
                Add Product
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    )
  }
}

export default NewProduct;

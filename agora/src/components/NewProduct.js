import React from "react";
import { PhotoPicker } from "aws-amplify-react";
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

const initialState = {
  description: "",
  price: "",
  shipped: false,
  image: "",
  imagePreview: ""
};

class NewProduct extends React.Component {

  state = { ...initialState };

  handleAddProduct = () => {
    console.log(this.state);
    this.setState({ ...initialState});
  };

  render() {

    const { shipped, imagePreview, description, image, price } = this.state;

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
                value={description}
                onChange={description => this.setState({ description })}
              />
            </Form.Item>

            <Form.Item label="Set Product Price">
              <Input
                  type="number"
                  icon="plus"
                  placeholder="price ($NZ)"
                  value={price}
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
            {imagePreview && (
                <img
                  className="image-preview"
                  src={imagePreview}
                  alt="Product Preview"
                />
            )}
            <Form.Item>
              <PhotoPicker
                title="Product Image"
                preview="hidden"
                onLoad={url => this.setState({imagePreview: url})}
                onPick={file => this.setState({ image: file })}
                theme={{
                  formContainer: {
                    margin: 0,
                    padding: "0.8em"
                  },
                  formSection: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  sectionBody: {
                    margin: 0,
                    width: "250px"
                  },
                  sectionHeader: {
                    padding: "0.2em",
                    color: "var(--darkAmazonOrange)"
                  },
                  photoPickerButton: {
                    display: "none"
                  }
                }}

              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                disabled={!image || !description || !price}
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

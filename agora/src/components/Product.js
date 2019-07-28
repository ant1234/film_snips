import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
// prettier-ignore
import { Notification, Popover, Button, Dialog, Card, Form, Input, Radio } from "element-react";
import { updateProduct} from "../graphql/mutations";
import { convertCentsToDollars, convertDollarsToCents } from "../utils";
import { UserContext} from "../App";
import PayButton from "./PayButton";

class Product extends React.Component {

  state = {
    updateProductDialog: false,
    description: "",
    shipped: false,
    price: ""
  };

  handleUpdateProduct = async productId => {
    try {

      this.setState({ updateProductDialog: false });

      const { description, price, shipped } = this.state;

      const input = {
        id: productId,
        description,
        shipped,
        price: convertDollarsToCents(price)
      };

      const result = await API.graphql(graphqlOperation(updateProduct, { input }));

      console.log({result});

      Notification({
        title: "Success",
        message: "Product successfully updated!",
        type: "success"
      });

      setTimeout(() => window.location.reload(), 3000 );

    } catch(err){

      console.error(`Failed to update the product with id : ${productId}`, err);

      Notification.error({
        title: "Error",
        message: "Something went wrong, couldn't update the product",
        type: "error"
      });

    }
  };
  render() {
    const { product } = this.props;
    const { updateProductDialog, description, shipped, price } = this.state;
    return (
        <UserContext.Consumer>

          {({ user }) => {

            const isProductOwner = user && user.attributes.sub === product.owner;

            return (
              <div className="card-container">
                <Card bodyStyle={{ padding: 0, minWidth: '200px'}}>
                  <S3Image
                      imgKey={product.file.key}
                      theme={{
                        photoImg: { maxWidth: '100%', maxHeight: '100%' }
                      }}
                  />
                  <div className="card-body">
                    <h3 className="m-0">{product.description}</h3>
                    <div className="items-center">
                      <img
                          src={`http://icon.now.sh/${product.shipped ? "markunread_mailbox" : "mail"}`}
                          alt="Shipped Icon"
                          className="icon"
                      />
                      {product.shipped ? "Shipped" : "Emailed"}
                    </div>
                    <div className="text-right">
                  <span className="mx-1">
                    ${convertCentsToDollars(product.price)}
                  </span>
                      {isProductOwner && (
                          <PayButton/>
                      )}
                    </div>
                  </div>
                </Card>
                {/* Update and delete */}
                <div className="text-center">
                  {isProductOwner && (
                      <>
                        <Button
                          type="warning"
                          icon="edit"
                          className="m-1"
                          onClick={() => this.setState({
                            updateProductDialog: true,
                            description: product.description,
                            shipped: product.shipped,
                            price: convertCentsToDollars(product.price)
                          })}
                        />

                        <Button
                            type="danger"
                            icon="delete"
                            // className="m-1"
                            // onClick={() => this.setState({ updateProductDialog: true })}
                        />
                      </>
                  )}
                </div>

                {/* Update product dialog */}
                <Dialog
                  title="Update Product"
                  size="large"
                  customClass="dialog"
                  visible={updateProductDialog}
                  onCancel={()=> this.setState({ updateProductDialog: false })}
                >
                  <Dialog.Body>
                    <Form labelPosition="top">
                      <Form.Item label="Update Product Description">
                        <Input
                            icon="information"
                            placeholder="Product Description"
                            value={description}
                            trim={true}
                            onChange={description => this.setState({ description })}
                        />
                      </Form.Item>

                      <Form.Item label="Update Product Price">
                        <Input
                            type="number"
                            icon="plus"
                            placeholder="price ($NZ)"
                            value={price}
                            onChange={price => this.setState({ price })}
                        />
                      </Form.Item>

                      <Form.Item label="Update Shipping">
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
                    </Form>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button
                        onClick={() => this.setState({ updateProductDialog: false })}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => this.handleUpdateProduct(product.id)}
                    >
                      Update
                    </Button>
                  </Dialog.Footer>
                </Dialog>
              </div>
                );
          }}
        </UserContext.Consumer>
    )
  }
}

export default Product;

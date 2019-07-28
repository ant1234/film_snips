import React from "react";
// import { Notification, Message } from "element-react";

import StripeCheckout from "react-stripe-checkout";

const stripeConfig = {
  currency: "USD",
  publishableAPIKey: "pk_test_eWKk1yKTQXXo3brVMHe2z15H"
};

const PayButton = ({product, user}) => {
  return (
    <StripeCheckout
      email={user.email}
      name={product.description}
      amount={product.price}
      currency={stripeConfig.currency}
      stripeKey={stripeConfig.publishableAPIKey}
      shippingAddress={product.shipped}
      billingAddress={product.shipped}
      locale="auto"
      allowRememberMe={false}
    />
  );
};

export default PayButton;

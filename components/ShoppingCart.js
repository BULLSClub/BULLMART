// components/ShoppingCart.js
import { useSelector } from "react-redux";

function ShoppingCart() {
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((domain, index) => (
          <li key={index}>{domain}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;

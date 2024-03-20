import React from 'react';

function Cart() {
  // Retrieve cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Function to handle item deletion
  const handleDeleteItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    // Refresh the page or update state to reflect the changes
    window.location.reload();
  };

  // Function to handle decrementing quantity
  const handleDecrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    // Refresh the page or update state to reflect the changes
    window.location.reload();
  };

  // Function to handle incrementing quantity
  const handleIncrementQuantity = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    // Refresh the page or update state to reflect the changes
    window.location.reload();
  };

  // Function to aggregate identical products and calculate total price
  const aggregatedCartItems = cartItems.reduce((acc, curr) => {
    const index = acc.findIndex(item => item.id === curr.id);
    if (index !== -1) {
      acc[index].quantity += 1;
    } else {
      acc.push({ ...curr, quantity: 1 });
    }
    return acc;
  }, []);

  // Function to calculate total price
  const total = aggregatedCartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <table className='table table-hover caption-top'>
        <caption>Your cart summary</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Preview</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedCartItems.map((cart) => (
            <tr key={cart.id}>
              <td>{cart.title}</td>
              <td>
                <img src={cart.image} width='50' height='50' alt={cart.title} />
              </td>
              <td>${cart.price}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleDecrementQuantity(cart.id)}>
                  <i className="bi bi-dash"></i>
                </button>
                {cart.quantity}
                <button className="btn btn-secondary" onClick={() => handleIncrementQuantity(cart.id)}>
                  <i className="bi bi-plus"></i>
                </button>
              </td>
              <td>${cart.price * cart.quantity}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteItem(cart.id)}>
                  <i className="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">Total</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;

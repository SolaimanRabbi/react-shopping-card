import React from "react";
import "./App.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Card from "./components/Card";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cardItems: localStorage.getItem("cardItems")
        ? JSON.parse(localStorage.getItem("cardItems"))
        : [],
      sizes: "",
      sort: "",
    };
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
  removeFromCard = (product) => {
    const cardItems = this.state.cardItems.slice();
    this.setState({
      cardItems: cardItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cardItems",
      JSON.stringify(cardItems.filter((x) => x._id !== product._id))
    );
  };

  addToCard = (product) => {
    const cardItems = this.state.cardItems.slice();
    let alreadyInCard = false;
    cardItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCard = true;
      }
    });
    if (!alreadyInCard) {
      cardItems.push({ ...product, count: 1 });
    }
    this.setState({ cardItems });
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
  };

  filterProducts = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({ size: e.target.value, product: data.products });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  sortProducts = (e) => {
    const sort = e.target.value;
    console.log(e.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Card</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCard={this.addToCard}
              />
            </div>
            <div className="sidebar">
              <Card
                cardItems={this.state.cardItems}
                removeFromCard={this.removeFromCard}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;

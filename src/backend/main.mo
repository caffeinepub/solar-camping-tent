import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

import Runtime "mo:core/Runtime";


actor {
  private type Review = {
    productId : Nat;
    rating : Nat;
    reviewText : Text;
    reviewerName : Text;
    timestamp : Int;
  };

  private type CartItem = {
    productId : Nat;
    productName : Text;
    price : Float;
    quantity : Nat;
  };

  // Persistent state types
  private type Cart = List.List<CartItem>;

  private type Order = {
    orderId : Nat;
    customerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    pincode : Text;
    paymentMethod : Text;
    cartItems : Cart;
    status : Text;
  };

  // Public return types
  type OrderView = {
    orderId : Nat;
    customerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    pincode : Text;
    paymentMethod : Text;
    cartItems : [CartItem];
    status : Text;
  };

  // Conversion between persistent and public types
  func toOrderView(order : Order) : OrderView {
    {
      orderId = order.orderId;
      customerName = order.customerName;
      email = order.email;
      phone = order.phone;
      address = order.address;
      city = order.city;
      state = order.state;
      pincode = order.pincode;
      paymentMethod = order.paymentMethod;
      cartItems = order.cartItems.toArray();
      status = order.status;
    };
  };

  // Persistent state
  let subscribers = List.empty<Text>();
  let reviews = Map.empty<Nat, List.List<Review>>();
  let carts = Map.empty<Text, List.List<CartItem>>();
  let orders = Map.empty<Nat, Order>();

  var nextOrderId = 1;

  // Newsletter subscription
  public shared ({ caller }) func subscribe(email : Text) : async () {
    let existing = subscribers.find(
      func(e) { e == email }
    );
    switch (existing) {
      case (?_) { Runtime.trap("Email already subscribed!") };
      case (null) {
        subscribers.add(email);
      };
    };
  };

  public query ({ caller }) func getSubscriberCount() : async Nat {
    subscribers.size();
  };

  // Product reviews
  public shared ({ caller }) func submitReview(
    productId : Nat,
    rating : Nat,
    reviewText : Text,
    reviewerName : Text
  ) : async () {
    switch (rating) {
      case (0) { Runtime.trap("Rating must be between 1 and 5!") };
      case (6) { Runtime.trap("Rating must be between 1 and 5!") };
      case (_) {
        let review : Review = {
          productId;
          rating;
          reviewText;
          reviewerName;
          timestamp = 0;
        };

        let productReviews = switch (reviews.get(productId)) {
          case (null) { List.empty<Review>() };
          case (?existing) { existing };
        };

        productReviews.add(review);
        reviews.add(productId, productReviews);
      };
    };
  };

  public query ({ caller }) func getReviews(productId : Nat) : async [Review] {
    switch (reviews.get(productId)) {
      case (null) { [] };
      case (?reviewsList) { reviewsList.toArray() };
    };
  };

  public query ({ caller }) func getAverageRating(productId : Nat) : async Float {
    switch (reviews.get(productId)) {
      case (null) { 0.0 };
      case (?reviewsList) {
        let size = reviewsList.size();
        if (size == 0) { return 0.0 };
        let sum = reviewsList.foldLeft(0, func(acc, rev) { acc + rev.rating });
        sum.toFloat() / size.toFloat();
      };
    };
  };

  // Cart management
  public shared ({ caller }) func addToCart(
    sessionId : Text,
    productId : Nat,
    productName : Text,
    price : Float,
    quantity : Nat
  ) : async () {
    let cartItem : CartItem = {
      productId;
      productName;
      price;
      quantity;
    };

    let cart = switch (carts.get(sessionId)) {
      case (null) { List.empty<CartItem>() };
      case (?existing) { existing };
    };

    cart.add(cartItem);
    carts.add(sessionId, cart);
  };

  public shared ({ caller }) func removeFromCart(sessionId : Text, productId : Nat) : async () {
    switch (carts.get(sessionId)) {
      case (null) { Runtime.trap("Cart not found!") };
      case (?cart) {
        let filteredCart = cart.filter(
          func(item) { item.productId != productId }
        );
        carts.add(sessionId, filteredCart);
      };
    };
  };

  public query ({ caller }) func getCart(sessionId : Text) : async [CartItem] {
    switch (carts.get(sessionId)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func clearCart(sessionId : Text) : async () {
    carts.remove(sessionId);
  };

  // Order placement
  public shared ({ caller }) func placeOrder(
    sessionId : Text,
    customerName : Text,
    email : Text,
    phone : Text,
    address : Text,
    city : Text,
    state : Text,
    pincode : Text,
    paymentMethod : Text,
  ) : async Nat {
    let cart = switch (carts.get(sessionId)) {
      case (null) { Runtime.trap("Cart not found!") };
      case (?cart) { cart };
    };

    let order : Order = {
      orderId = nextOrderId;
      customerName;
      email;
      phone;
      address;
      city;
      state;
      pincode;
      paymentMethod;
      cartItems = cart;
      status = "Pending";
    };

    orders.add(nextOrderId, order);
    carts.remove(sessionId);
    nextOrderId += 1;
    order.orderId;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async ?OrderView {
    orders.get(orderId).map(toOrderView);
  };
};

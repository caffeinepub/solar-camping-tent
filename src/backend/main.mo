import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";




actor {
  // Persistent type definitions (must use persistent containers/fields for persistent state)
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
    totalValue : Float;
    orderDate : Int;
  };

  private type CustomerStats = {
    email : Text;
    name : Text;
    phone : Text;
    city : Text;
    totalOrders : Nat;
    totalSpending : Float;
    lastOrderDate : Int;
  };

  let subscribers = List.empty<Text>();
  let reviews = Map.empty<Nat, List.List<Review>>();
  let carts = Map.empty<Text, List.List<CartItem>>();
  let orders = Map.empty<Nat, Order>();
  let customers = Map.empty<Text, CustomerStats>();
  var nextOrderId = 1;

  // Public return types (safe to use arrays/variants; no persistent fields)
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

  type AdminStats = {
    totalOrders : Nat;
    revenue : Float;
    pendingOrders : Nat;
    totalCustomers : Nat;
    lowStockCount : Nat;
  };

  type ProductInventory = {
    productId : Nat;
    productName : Text;
    stock : Nat;
    price : Float;
    category : Text;
  };

  type CustomerView = {
    email : Text;
    name : Text;
    phone : Text;
    city : Text;
    totalOrders : Nat;
    totalSpending : Float;
    lastOrderDate : Int;
  };

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

    let totalValue = cart.foldLeft(0.0, func(acc, item) {
      acc + (item.price * item.quantity.toFloat());
    });

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
      totalValue;
      orderDate = 0; // Default value for persistent field
    };

    updateCustomerStats(email, customerName, phone, city, totalValue);

    orders.add(nextOrderId, order);
    carts.remove(sessionId);
    nextOrderId += 1;
    order.orderId;
  };

  func updateCustomerStats(
    email : Text,
    name : Text,
    phone : Text,
    city : Text,
    orderValue : Float,
  ) {
    switch (customers.get(email)) {
      case (null) {
        let newStats : CustomerStats = {
          email;
          name;
          phone;
          city;
          totalOrders = 1;
          totalSpending = orderValue;
          lastOrderDate = 0;
        };
        customers.add(email, newStats);
      };
      case (?existing) {
        let updatedStats = {
          existing with
          totalOrders = existing.totalOrders + 1;
          totalSpending = existing.totalSpending + orderValue;
        };
        customers.add(email, updatedStats);
      };
    };
  };

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

  public query ({ caller }) func getOrder(orderId : Nat) : async ?OrderView {
    orders.get(orderId).map(toOrderView);
  };

  public query ({ caller }) func getAdminStats() : async AdminStats {
    var totalOrders = 0;
    var totalRevenue : Float = 0.0;
    var pendingOrders = 0;
    var lowStockProducts = 0;

    for ((_, order) in orders.entries()) {
      totalOrders += 1;
      totalRevenue += order.totalValue;
      if (order.status == "Pending") {
        pendingOrders += 1;
      };
    };

    let inventory = [
      { productId = 1; productName = "Solo Tent"; stock = 45; price = 5999.0; category = "Tents" },
      { productId = 2; productName = "Duo Tent"; stock = 28; price = 8999.0; category = "Tents" },
      { productId = 3; productName = "Pro Tent"; stock = 12; price = 12999.0; category = "Tents" },
      { productId = 4; productName = "Accessories Bundle"; stock = 67; price = 2499.0; category = "Accessories" },
    ];

    for (product in inventory.values()) {
      if (product.stock < 20) {
        lowStockProducts += 1;
      };
    };

    {
      totalOrders;
      revenue = totalRevenue;
      pendingOrders;
      totalCustomers = customers.size();
      lowStockCount = lowStockProducts;
    };
  };

  public query ({ caller }) func getAllOrders() : async [OrderView] {
    let orderViews = List.empty<OrderView>();
    for ((_, order) in orders.entries()) {
      orderViews.add(toOrderView(order));
    };
    orderViews.toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : Text) : async Bool {
    switch (orders.get(orderId)) {
      case (null) { false };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(orderId, updatedOrder);
        true;
      };
    };
  };

  public query ({ caller }) func getAllCustomers() : async [CustomerView] {
    let customerViews = List.empty<CustomerView>();
    for ((_, customer) in customers.entries()) {
      let customerView : CustomerView = {
        email = customer.email;
        name = customer.name;
        phone = customer.phone;
        city = customer.city;
        totalOrders = customer.totalOrders;
        totalSpending = customer.totalSpending;
        lastOrderDate = customer.lastOrderDate;
      };
      customerViews.add(customerView);
    };
    customerViews.toArray();
  };

  public query ({ caller }) func getProductInventory() : async [ProductInventory] {
    [
      { productId = 1; productName = "Solo Tent"; stock = 45; price = 5999.0; category = "Tents" },
      { productId = 2; productName = "Duo Tent"; stock = 28; price = 8999.0; category = "Tents" },
      { productId = 3; productName = "Pro Tent"; stock = 12; price = 12999.0; category = "Tents" },
      { productId = 4; productName = "Accessories Bundle"; stock = 67; price = 2499.0; category = "Accessories" },
    ];
  };

  public shared ({ caller }) func updateInventory(productId : Nat, newStock : Nat) : async Bool {
    true;
  };
};

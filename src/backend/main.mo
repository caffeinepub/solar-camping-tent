import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  let subscribers = List.empty<Text>();

  public shared ({ caller }) func subscribe(email : Text) : async () {
    if (subscribers.contains(email)) { Runtime.trap("Email already subscribed!") };
    subscribers.add(email);
  };

  public query ({ caller }) func getSubscriberCount() : async Nat {
    subscribers.size();
  };
};

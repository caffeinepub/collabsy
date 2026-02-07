import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserRole = {
    #brand;
    #creator;
  };

  public type SocialMediaLinks = {
    instagram : ?Text;
    youtube : ?Text;
    tiktok : ?Text;
    twitter : ?Text;
    facebook : ?Text;
    others : ?[Text];
  };

  public type UserProfile = {
    role : UserRole;
    email : Text;
    createdAt : Int;
  };

  public type BrandProfile = {
    name : Text;
    email : Text;
    industry : Text;
    createdAt : Int;
  };

  public type CreatorProfile = {
    id : Principal;
    fullName : Text;
    phoneNumber : Text;
    email : Text;
    instagramFollowers : Nat;
    youtubeSubscribers : Nat;
    tiktokFollowers : ?Nat;
    pricingReel : Nat;
    pricingPost : Nat;
    pricingVideo : Nat;
    category : Text;
    socialMediaLinks : SocialMediaLinks;
    profilePicture : ?Storage.ExternalBlob;
    createdAt : Int;
  };

  public type CollaborationRequest = {
    id : Nat;
    brand : Principal;
    creator : Principal;
    campaignDetails : Text;
    status : {
      #pending;
      #accepted;
      #rejected;
      #completed;
    };
    createdAt : Int;
  };

  public type PaymentTransaction = {
    id : Nat;
    sender : Principal;
    receiver : Principal;
    amount : Nat;
    status : {
      #pending;
      #completed;
      #failed;
    };
    createdAt : Int;
  };

  public type DashboardStats = {
    totalCampaigns : Nat;
    completedCampaigns : Nat;
    totalSpend : Nat;
    active : Nat;
    pending : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let brandProfiles = Map.empty<Principal, BrandProfile>();
  let creatorProfiles = Map.empty<Principal, CreatorProfile>();
  let collaborationRequests = Map.empty<Nat, CollaborationRequest>();
  let paymentTransactions = Map.empty<Nat, PaymentTransaction>();
  var nextCollabId : Nat = 0;
  var nextPaymentId : Nat = 0;
  var configuration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    if (not isBrand(caller)) {
      Runtime.trap("Unauthorized: Only brands can create checkout sessions");
    };
    let inrItems = items.map(
      func(item) {
        { item with currency = "inr" };
      }
    );
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, inrItems, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func isBrand(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        switch (profile.role) {
          case (#brand) { true };
          case (_) { false };
        };
      };
    };
  };

  func isCreator(caller : Principal) : Bool {
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        switch (profile.role) {
          case (#creator) { true };
          case (_) { false };
        };
      };
    };
  };

  public shared ({ caller }) func registerBrand(name : Text, email : Text, industry : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register");
    };
    switch (userProfiles.get(caller)) {
      case (?_) { Runtime.trap("User already registered") };
      case (null) {};
    };

    let userProfile : UserProfile = {
      role = #brand;
      email;
      createdAt = Time.now();
    };
    userProfiles.add(caller, userProfile);

    let brandProfile : BrandProfile = {
      name;
      email;
      industry;
      createdAt = Time.now();
    };
    brandProfiles.add(caller, brandProfile);
  };

  public shared ({ caller }) func registerCreator(
    fullName : Text,
    phoneNumber : Text,
    email : Text,
    instagramFollowers : Nat,
    youtubeSubscribers : Nat,
    tiktokFollowers : ?Nat,
    pricingReel : Nat,
    pricingPost : Nat,
    pricingVideo : Nat,
    category : Text,
    socialMediaLinks : SocialMediaLinks,
    profilePicture : ?Storage.ExternalBlob,
  ) : async CreatorProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can register");
    };
    switch (userProfiles.get(caller)) {
      case (?_) { Runtime.trap("User already registered") };
      case (null) {};
    };
    let userProfile : UserProfile = {
      role = #creator;
      email;
      createdAt = Time.now();
    };
    userProfiles.add(caller, userProfile);
    let creatorProfile : CreatorProfile = {
      id = caller;
      fullName;
      phoneNumber;
      email;
      instagramFollowers;
      youtubeSubscribers;
      tiktokFollowers;
      pricingReel;
      pricingPost;
      pricingVideo;
      category;
      socialMediaLinks;
      profilePicture;
      createdAt = Time.now();
    };
    creatorProfiles.add(caller, creatorProfile);
    creatorProfile;
  };

  public shared ({ caller }) func updateCreatorProfile(
    fullName : Text,
    phoneNumber : Text,
    instagramFollowers : Nat,
    youtubeSubscribers : Nat,
    tiktokFollowers : ?Nat,
    pricingReel : Nat,
    pricingPost : Nat,
    pricingVideo : Nat,
    category : Text,
    socialMediaLinks : SocialMediaLinks,
    profilePicture : ?Storage.ExternalBlob,
  ) : async CreatorProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update creator profiles");
    };
    if (not isCreator(caller)) {
      Runtime.trap("Unauthorized: Only creators can update their own profile");
    };
    switch (creatorProfiles.get(caller)) {
      case (null) { Runtime.trap("Creator profile not found") };
      case (?existingProfile) {
        let updatedProfile : CreatorProfile = {
          id = caller;
          fullName;
          phoneNumber;
          email = existingProfile.email;
          instagramFollowers;
          youtubeSubscribers;
          tiktokFollowers;
          pricingReel;
          pricingPost;
          pricingVideo;
          category;
          socialMediaLinks;
          profilePicture;
          createdAt = existingProfile.createdAt;
        };
        creatorProfiles.add(caller, updatedProfile);
        updatedProfile;
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getBrandProfile() : async BrandProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    if (not isBrand(caller)) {
      Runtime.trap("Unauthorized: Only brands can access brand profiles");
    };
    switch (brandProfiles.get(caller)) {
      case (null) { Runtime.trap("Brand profile not found") };
      case (?profile) { profile };
    };
  };

  public query ({ caller }) func getCreatorProfile() : async CreatorProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    if (not isCreator(caller)) {
      Runtime.trap("Unauthorized: Only creators can access creator profiles");
    };
    switch (creatorProfiles.get(caller)) {
      case (null) { Runtime.trap("Creator profile not found") };
      case (?profile) { profile };
    };
  };

  public query ({ caller }) func getCreatorById(creatorId : Principal) : async CreatorProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view creator profiles");
    };

    switch (creatorProfiles.get(creatorId)) {
      case (null) { Runtime.trap("Creator profile not found") };
      case (?profile) { profile };
    };
  };

  public query ({ caller }) func browseCreators(
    platform : ?Text,
    minFollowers : ?Nat,
    maxFollowers : ?Nat,
    minPrice : ?Nat,
    maxPrice : ?Nat,
    category : ?Text,
  ) : async [CreatorProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can browse creators");
    };
    if (not isBrand(caller)) {
      Runtime.trap("Unauthorized: Only brands can browse creators");
    };

    let allCreators = creatorProfiles.values().toArray();
    let filtered = allCreators.filter(
      func(creator : CreatorProfile) : Bool {
        let platformMatch = switch (platform) {
          case (null) { true };
          case (?p) {
            if (Text.equal(p, "instagram")) { creator.instagramFollowers > 0 }
            else if (Text.equal(p, "youtube")) { creator.youtubeSubscribers > 0 }
            else if (Text.equal(p, "tiktok")) {
              switch (creator.tiktokFollowers) {
                case (null) { false };
                case (?followers) { followers > 0 };
              };
            } else { false };
          };
        };

        let totalFollowers = creator.instagramFollowers + creator.youtubeSubscribers + (switch (creator.tiktokFollowers) { case (null) { 0 }; case (?f) { f } });

        let followersMatch = switch (minFollowers, maxFollowers) {
          case (null, null) { true };
          case (?min, null) { totalFollowers >= min };
          case (null, ?max) { totalFollowers <= max };
          case (?min, ?max) { totalFollowers >= min and totalFollowers <= max };
        };

        let avgPrice = (creator.pricingReel + creator.pricingPost + creator.pricingVideo) / 3;
        let priceMatch = switch (minPrice, maxPrice) {
          case (null, null) { true };
          case (?min, null) { avgPrice >= min };
          case (null, ?max) { avgPrice <= max };
          case (?min, ?max) { avgPrice >= min and avgPrice <= max };
        };

        let categoryMatch = switch (category) {
          case (null) { true };
          case (?cat) { Text.equal(creator.category, cat) };
        };

        platformMatch and followersMatch and priceMatch and categoryMatch;
      }
    );

    filtered;
  };

  public shared ({ caller }) func createCollaborationRequest(
    creatorId : Principal,
    campaignDetails : Text,
  ) : async CollaborationRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create collaboration requests");
    };
    if (not isBrand(caller)) {
      Runtime.trap("Unauthorized: Only brands can create collaboration requests");
    };

    switch (creatorProfiles.get(creatorId)) {
      case (null) { Runtime.trap("Creator not found") };
      case (?_) {};
    };

    let request : CollaborationRequest = {
      id = nextCollabId;
      brand = caller;
      creator = creatorId;
      campaignDetails;
      status = #pending;
      createdAt = Time.now();
    };
    collaborationRequests.add(nextCollabId, request);
    nextCollabId += 1;
    request;
  };

  public shared ({ caller }) func updateCollaborationStatus(
    collabId : Nat,
    status : { #pending; #accepted; #rejected; #completed }
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update collaboration status");
    };

    switch (collaborationRequests.get(collabId)) {
      case (null) { Runtime.trap("Collaboration request not found") };
      case (?request) {
        if (caller != request.brand and caller != request.creator) {
          Runtime.trap("Unauthorized: Only the brand or creator involved can update status");
        };

        switch (status) {
          case (#accepted) {
            if (caller != request.creator) {
              Runtime.trap("Unauthorized: Only the creator can accept a collaboration request");
            };
          };
          case (#rejected) {
            if (caller != request.creator) {
              Runtime.trap("Unauthorized: Only the creator can reject a collaboration request");
            };
          };
          case (#completed) {
            if (caller != request.brand) {
              Runtime.trap("Unauthorized: Only the brand can mark a collaboration as completed");
            };
          };
          case (#pending) {
            Runtime.trap("Cannot revert status back to pending");
          };
        };

        let updatedRequest : CollaborationRequest = {
          id = request.id;
          brand = request.brand;
          creator = request.creator;
          campaignDetails = request.campaignDetails;
          status;
          createdAt = request.createdAt;
        };
        collaborationRequests.add(collabId, updatedRequest);
      };
    };
  };

  public query ({ caller }) func getCollaborationRequest(collabId : Nat) : async CollaborationRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view collaboration requests");
    };

    switch (collaborationRequests.get(collabId)) {
      case (null) { Runtime.trap("Collaboration request not found") };
      case (?request) {
        if (caller != request.brand and caller != request.creator and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own collaboration requests");
        };
        request;
      };
    };
  };

  public shared ({ caller }) func createPaymentTransaction(receiver : Principal, amount : Nat) : async PaymentTransaction {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create payment transactions");
    };
    if (not isBrand(caller)) {
      Runtime.trap("Unauthorized: Only brands can create payment transactions");
    };

    if (not isCreator(receiver)) {
      Runtime.trap("Invalid receiver: Must be a creator");
    };

    let transaction : PaymentTransaction = {
      id = nextPaymentId;
      sender = caller;
      receiver;
      amount;
      status = #pending;
      createdAt = Time.now();
    };
    paymentTransactions.add(nextPaymentId, transaction);
    nextPaymentId += 1;
    transaction;
  };

  public shared ({ caller }) func updatePaymentStatus(
    transactionId : Nat,
    status : { #pending; #completed; #failed }
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update payment status");
    };

    switch (paymentTransactions.get(transactionId)) {
      case (null) { Runtime.trap("Payment transaction not found") };
      case (?transaction) {
        let updatedTransaction : PaymentTransaction = {
          id = transaction.id;
          sender = transaction.sender;
          receiver = transaction.receiver;
          amount = transaction.amount;
          status;
          createdAt = transaction.createdAt;
        };
        paymentTransactions.add(transactionId, updatedTransaction);
      };
    };
  };

  public query ({ caller }) func getPaymentTransaction(transactionId : Nat) : async PaymentTransaction {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view payment transactions");
    };

    switch (paymentTransactions.get(transactionId)) {
      case (null) { Runtime.trap("Payment transaction not found") };
      case (?transaction) {
        if (caller != transaction.sender and caller != transaction.receiver and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own payment transactions");
        };
        transaction;
      };
    };
  };

  public query ({ caller }) func getBrandDashboardStats() : async DashboardStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access dashboard stats");
    };
    if (not isBrand(caller)) {
      Runtime.trap("Unauthorized: Only brands can access brand dashboard");
    };

    var totalCampaigns : Nat = 0;
    var completedCampaigns : Nat = 0;
    var pendingCampaigns : Nat = 0;

    for ((id, collab) in collaborationRequests.entries()) {
      if (collab.brand == caller) {
        totalCampaigns += 1;
        switch (collab.status) {
          case (#completed) { completedCampaigns += 1 };
          case (#pending) { pendingCampaigns += 1 };
          case (_) {};
        };
      };
    };

    var totalSpend : Nat = 0;
    for ((id, txn) in paymentTransactions.entries()) {
      if (txn.sender == caller and txn.status == #completed) {
        totalSpend += txn.amount;
      };
    };

    {
      totalCampaigns;
      completedCampaigns;
      totalSpend;
      active = totalCampaigns - completedCampaigns;
      pending = pendingCampaigns;
    };
  };

  public query ({ caller }) func getCreatorDashboardStats() : async DashboardStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access dashboard stats");
    };
    if (not isCreator(caller)) {
      Runtime.trap("Unauthorized: Only creators can access creator dashboard");
    };

    var totalCampaigns : Nat = 0;
    var completedCampaigns : Nat = 0;
    var pendingCampaigns : Nat = 0;

    for ((id, collab) in collaborationRequests.entries()) {
      if (collab.creator == caller) {
        totalCampaigns += 1;
        switch (collab.status) {
          case (#completed) { completedCampaigns += 1 };
          case (#pending) { pendingCampaigns += 1 };
          case (_) {};
        };
      };
    };

    var totalEarnings : Nat = 0;
    for ((id, txn) in paymentTransactions.entries()) {
      if (txn.receiver == caller and txn.status == #completed) {
        totalEarnings += txn.amount;
      };
    };

    {
      totalCampaigns;
      completedCampaigns;
      totalSpend = totalEarnings;
      active = totalCampaigns - completedCampaigns;
      pending = pendingCampaigns;
    };
  };
};

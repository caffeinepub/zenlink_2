import Map "mo:core/Map";
import Text "mo:core/Text";
import Set "mo:core/Set";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Roles and Authorization with access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Data Models
  // Types and structures
  public type MBTIType = { introvert : Nat; extrovert : Nat; thinking : Nat; feeling : Nat };
  public type UserProfile = {
    username : Text;
    avatar : Nat;
    mbti : ?MBTIType;
    interests : [Text];
    growthGoals : [Text];
    bio : Text;
    userId : Text;
  };

  public type Circle = {
    id : Text;
    name : Text;
    description : Text;
    isDemo : Bool;
    admin : ?Principal;
    members : [Text];
  };

  public type Room = {
    id : Text;
    title : Text;
    topic : Text;
    speaker : ?Principal;
    creator : ?Principal;
    isDemo : Bool;
    participants : [Text];
    isActive : Bool;
  };

  public type Post = {
    id : Text;
    author : Text;
    category : Text;
    content : Text;
    timestamp : Time.Time;
    likes : Nat;
    isDemo : Bool;
  };

  public type Comment = {
    id : Text;
    author : Text;
    postId : Text;
    content : Text;
    timestamp : Time.Time;
    likes : Nat;
  };

  public type Connection = {
    user1 : Text;
    user2 : Text;
    status : Text;
    circleInvite : ?Text;
  };

  public type Reflection = {
    id : Text;
    userId : Text;
    content : Text;
    timestamp : Time.Time;
    toneScore : Nat;
    empathyScore : Nat;
    communicationAdvice : Text;
    growthInsights : Text;
  };

  public type Challenge = {
    id : Text;
    title : Text;
    description : Text;
    isWeekly : ?Bool;
    createdBy : Text;
  };

  // State and persistence
  let profiles = Map.empty<Principal, UserProfile>();
  let circles = Map.empty<Text, Circle>();
  let rooms = Map.empty<Text, Room>();
  let posts = Map.empty<Text, Post>();
  let comments = Map.empty<Text, Comment>();
  let connections = Map.empty<Text, Connection>();
  let challenges = Map.empty<Text, Challenge>();
  let reflections = Map.empty<Text, Reflection>();

  // Helper functions
  func getCallerId(caller : Principal) : Text {
    caller.toText();
  };

  // Required Profile Functions (per instructions)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };

  // Profiles CRUD
  public shared ({ caller }) func createOrUpdateProfile(username : Text, avatar : Nat, isAnonymous : Bool) : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create profiles");
    };

    let existing = profiles.get(caller);

    let newProfile : UserProfile = {
      username;
      avatar;
      mbti = null;
      interests = [];
      growthGoals = [];
      bio = "";
      userId = getCallerId(caller);
    };

    switch (existing, isAnonymous) {
      case (null, true) {
        profiles.add(caller, newProfile);
      };
      case (?oldProfile, false) {
        profiles.add(caller, oldProfile);
      };
      case (?_, true) {
        Runtime.trap("Profile already exists!");
      };
      case (null, false) {
        Runtime.trap("Please create an anonymous profile!");
      };
    };

    switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Internal Error: Profile not found!") };
      case (?profile) { profile };
    };
  };

  // Growth Circles CRUD
  public shared ({ caller }) func createCircle(name : Text, description : Text, isDemo : Bool) : async Circle {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create circles");
    };

    let creatorId = getCallerId(caller);
    let newCircle : Circle = {
      id = creatorId.concat("circle" # Time.now().toText());
      name;
      description;
      isDemo;
      members = [creatorId];
      admin = ?caller;
    };

    circles.add(newCircle.id, newCircle);
    newCircle;
  };

  public shared ({ caller }) func updateCircle(name : Text, description : Text, id : Text) : async Circle {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update circles");
    };

    switch (circles.get(id)) {
      case (null) { Runtime.trap("Circle Not Found") };
      case (?circle) {
        // Verify caller is the circle admin
        switch (circle.admin) {
          case (null) { Runtime.trap("Circle has no admin") };
          case (?admin) {
            if (admin != caller and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Only circle admin can update this circle");
            };
          };
        };

        if (circle.description == "Demo") {
          Runtime.trap("Cannot update demo circle");
        };

        let updatedCircle : Circle = {
          id = circle.id;
          name;
          description;
          isDemo = circle.isDemo;
          members = circle.members;
          admin = circle.admin;
        };
        circles.add(updatedCircle.id, updatedCircle);
        updatedCircle;
      };
    };
  };

  public shared ({ caller }) func removeCircle(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove circles");
    };

    switch (circles.get(id)) {
      case (null) { Runtime.trap("Circle not found") };
      case (?circle) {
        // Verify caller is the circle admin
        switch (circle.admin) {
          case (null) { Runtime.trap("Circle has no admin") };
          case (?admin) {
            if (admin != caller and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Only circle admin can remove this circle");
            };
          };
        };

        circles.remove(id);
      };
    };
  };

  public shared ({ caller }) func addMembersToCircle(circleId : Text, newMembers : [Text]) : async Circle {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add members to circles");
    };

    switch (circles.get(circleId)) {
      case (null) { Runtime.trap("Circle Not Found") };
      case (?circle) {
        // Verify caller is the circle admin or a member
        switch (circle.admin) {
          case (null) { Runtime.trap("Circle has no admin") };
          case (?admin) {
            let callerId = getCallerId(caller);
            let isMember = circle.members.find<Text>(func(m) { m == callerId }) != null;
            if (admin != caller and not isMember and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Unauthorized: Only circle admin or members can add members");
            };
          };
        };

        if (circle.members.size() + newMembers.size() > 8) {
          Runtime.trap("Circle limit exceeded");
        };

        let membersSet = Set.fromArray(circle.members).clone();
        for (member in newMembers.values()) {
          membersSet.add(member);
        };
        let finalMembers = membersSet.toArray();

        let updatedCircle : Circle = {
          id = circle.id;
          name = circle.name;
          description = circle.description;
          isDemo = circle.isDemo;
          members = finalMembers;
          admin = circle.admin;
        };
        circles.add(updatedCircle.id, updatedCircle);
        updatedCircle;
      };
    };
  };

  // Challenge CRUD - Admin only per implementation plan
  public shared ({ caller }) func manageChallenge(id : Text, title : Text, description : Text, isWeekly : Bool) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can manage challenges");
    };

    if (challenges.get(id) != null) {
      Runtime.trap("Challenge already exists");
    };

    let challenge : Challenge = {
      id;
      title;
      description;
      isWeekly = ?isWeekly;
      createdBy = getCallerId(caller);
    };

    challenges.add(id, challenge);
    id;
  };

  public shared ({ caller }) func updateChallenge(id : Text, title : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update challenges");
    };

    switch (challenges.get(id)) {
      case (null) { Runtime.trap("Challenge not found") };
      case (?challenge) {
        let updated : Challenge = {
          id;
          title;
          description;
          isWeekly = challenge.isWeekly;
          createdBy = challenge.createdBy;
        };
        challenges.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func removeChallenge(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove challenges");
    };

    if (not challenges.containsKey(id)) {
      Runtime.trap("Challenge not found");
    };

    challenges.remove(id);
  };

  // Query functions - require user permission
  public query ({ caller }) func isRegistered() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check registration");
    };
    profiles.containsKey(caller);
  };

  public query ({ caller }) func hasCircle(circleId : Text) : async Bool {
    // Any authenticated user can check if a circle exists
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check circles");
    };
    circles.containsKey(circleId);
  };

  public query ({ caller }) func getUserProfileById(userId : Text) : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };

    // Users can view other users' profiles (anonymous usernames only)
    switch (profiles.get(Principal.fromText(userId))) {
      case (null) { Runtime.trap("User does not exist") };
      case (?profile) { profile };
    };
  };

  // File Management (Blobs)
  public shared ({ caller }) func uploadBlob(id : Text, name : Text, blob : Storage.ExternalBlob) : async Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload blobs.");
    };

    blob;
  };
};

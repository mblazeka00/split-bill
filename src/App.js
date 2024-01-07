const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="App">
      <FormAddFriend />
    </div>
  );
}

export default App;

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👭 Friend Name</label>
      <input type="text" />

      <label>🌄 Image URL</label>
      <input type="text" />

      <button className="button">Add</button>
    </form>
  );
}

function FriendsList() {
  return <h2>Test</h2>;
}

import { useState } from "react";

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
  const [data, setData] = useState(initialFriends);
  const [addFriendForm, onAddFriendForm] = useState(false);

  function handleAddFriendForm() {
    onAddFriendForm((cur) => !cur);
  }

  const onAddFriend = (friend) => {
    setData((cur) => [...cur, friend]);
    console.log(data);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <FriendsList data={data} />
        {addFriendForm ? <FormAddFriend onAddFriend={onAddFriend} /> : ""}
        <Button onClick={handleAddFriendForm}>
          {addFriendForm === true ? "Cancel" : "Add friend"}
        </Button>
      </div>
    </div>
  );
}

export default App;

function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImageURL, setFriendImageURL] = useState(
    "https://i.pravatar.cc/48"
  );

  const newFriend = {
    id: Math.random(),
    name: friendName,
    image: friendImageURL,
    balance: 0,
  };

  function handleAddFriend(e) {
    e.preventDefault();
    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👭 Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={friendImageURL}
        onChange={(e) => setFriendImageURL(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FriendsList({ data }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>
        {friend.name} owes you ${friend.balance}
      </p>
      <button className="button">Select</button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

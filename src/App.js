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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriendForm() {
    onAddFriendForm((cur) => !cur);
  }

  const onAddFriend = (friend) => {
    setData((cur) => [...cur, friend]);
    onAddFriendForm(false);
  };

  const onSelect = (friend) => {
    setSelectedFriend(friend);
    if (friend === selectedFriend) {
      setSelectedFriend(null);
    }
  };

  const handleSplitBill = (whoIsPaying, paidByFriend, event) => {
    event.preventDefault();
    const updatedFriends = data.map((friend) => {
      if (friend.id === selectedFriend.id) {
        if (whoIsPaying === "user") {
          return { ...friend, balance: friend.balance + paidByFriend };
        } else {
          return { ...friend, balance: friend.balance - paidByFriend };
        }
      }
      return friend;
    });

    setData(updatedFriends);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          data={data}
          handleSelect={onSelect}
          selectedFriend={selectedFriend}
        />
        {addFriendForm ? <FormAddFriend onAddFriend={onAddFriend} /> : ""}
        <Button onClick={handleAddFriendForm}>
          {addFriendForm === true ? "Cancel" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

export default App;

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = billValue ? billValue - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(e.target.value)}
      />

      <label>🧍 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(e.target.value)}
      />

      <label>👭 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button onClick={(e) => onSplitBill(whoIsPaying, paidByFriend, e)}>
        Split
      </Button>
    </form>
  );
}

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
    setFriendName("");
    setFriendImageURL("https://i.pravatar.cc/48");
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

function FriendsList({ data, handleSelect, selectedFriend }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelect, selectedFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : "" || friend.balance < 0 ? "red" : ""
        }
      >
        {friend.balance === 0 ? `You and ${friend.name} are even.` : ""}
        {friend.balance > 0 ? `${friend.name} owes you $${friend.balance}` : ""}
        {friend.balance < 0
          ? `You owe ${friend.name} $${Math.abs(friend.balance)}`
          : ""}
      </p>
      <Button onClick={() => handleSelect(friend)}>
        {selectedFriend === friend ? "Close" : "Select"}
      </Button>
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

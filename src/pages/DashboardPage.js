

import React, { useEffect, useState } from 'react';
import {
  getFriends,
  addFriend,
  removeFriend,
  getUsers,
  updatePosition,
  getFriendsPositions,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} from './api';
import MapView from './MapView';
import './styles.css';

const DashboardPage = () => {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [friendToAdd, setFriendToAdd] = useState('');
  const [positionToUpdate, setPositionToUpdate] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    // Fetch initial data on component mount
    fetchFriends();
    fetchUsers();
  }, []);

  const fetchFriends = async () => {
    try {
      const friendsData = await getFriends();
      setFriends(friendsData);
    } catch (error) {
      console.error('Error fetching friends:', error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleAddFriend = async () => {
    try {
      await addFriend(friendToAdd);
      fetchFriends();
      setFriendToAdd('');
    } catch (error) {
      console.error('Error adding friend:', error.message);
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId);
      fetchFriends();
    } catch (error) {
      console.error('Error removing friend:', error.message);
    }
  };

  const handleUpdatePosition = async () => {
    try {
      await updatePosition(positionToUpdate);
      fetchFriendsPositions(); // Update friends positions on the map
    } catch (error) {
      console.error('Error updating position:', error.message);
    }
  };

  const handleFetchFriendsPositions = async () => {
    try {
      const friendsPositionsData = await getFriendsPositions();
      // Handle friends positions data (e.g., update state for rendering on the map)
      console.log('Friends Positions:', friendsPositionsData);
    } catch (error) {
      console.error('Error fetching friends positions:', error.message);
    }
  };

  const handleFetchCurrentUser = async () => {
    try {
      const currentUserData = await getCurrentUser();
      // Handle current user data (e.g., update state for displaying information)
      console.log('Current User:', currentUserData);
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  const handleUpdateCurrentUser = async () => {
    try {
      await updateCurrentUser({/* Updated user data */});
      
    } catch (error) {
      console.error('Error updating current user:', error.message);
    }
  };

  const handleDeleteCurrentUser = async () => {
    try {
      await deleteCurrentUser();
      // Handle successful deletion, e.g., redirect to the login page
    } catch (error) {
      console.error('Error deleting current user:', error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Dashboard Page</h1>
      </header>
      <div className="friend-management">
        <h2>Friend Management</h2>
        <div>
          <label>Add Friend:</label>
          <input type="text" value={friendToAdd} onChange={(e) => setFriendToAdd(e.target.value)} />
          <button onClick={handleAddFriend}>Add</button>
        </div>
        <div>
          <h3>Friends List:</h3>
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>
                {friend.username}
                <button onClick={() => handleRemoveFriend(friend.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="position-management">
        <h2>Position Management</h2>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="any"
            value={positionToUpdate.latitude}
            onChange={(e) =>
              setPositionToUpdate((prev) => ({ ...prev, latitude: parseFloat(e.target.value) }))
            }
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="any"
            value={positionToUpdate.longitude}
            onChange={(e) =>
              setPositionToUpdate((prev) => ({ ...prev, longitude: parseFloat(e.target.value) }))
            }
          />
        </div>
        <button onClick={handleUpdatePosition}>Update Position</button>
        <button onClick={handleFetchFriendsPositions}>Fetch Friends Positions</button>
      </div>
      <div className="user-management">
        <h2>User Management</h2>
        <button onClick={handleFetchCurrentUser}>Fetch Current User</button>
        <button onClick={handleUpdateCurrentUser}>Update Current User</button>
        <button onClick={handleDeleteCurrentUser}>Delete Current User</button>
      </div>
      {/* Include the MapView component within the DashboardPage */}
      <MapView friendsPositions={friends} currentUserPosition={positionToUpdate} />
    </div>
  );
};

export default DashboardPage;

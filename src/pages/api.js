

const apiUrl = 'https://api.joeleprof.com/tec-map';

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

const api = {
  register: async (userData) => {
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  login: async (userData) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  getFriends: async () => {
    const response = await fetch(`${apiUrl}/friends`);
    return handleResponse(response);
  },

  addFriend: async (userId) => {
    const response = await fetch(`${apiUrl}/friends/${userId}`, {
      method: 'POST',
    });

    return handleResponse(response);
  },

  removeFriend: async (userId) => {
    const response = await fetch(`${apiUrl}/friends/${userId}`, {
      method: 'DELETE',
    });

    return handleResponse(response);
  },

  getUsers: async () => {
    const response = await fetch(`${apiUrl}/users`);
    return handleResponse(response);
  },

  updatePosition: async (positionData) => {
    const response = await fetch(`${apiUrl}/position`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(positionData),
    });

    return handleResponse(response);
  },

  getFriendsPositions: async () => {
    const response = await fetch(`${apiUrl}/position/friends`);
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${apiUrl}/me`);
    return handleResponse(response);
  },

  updateCurrentUser: async (userData) => {
    const response = await fetch(`${apiUrl}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  deleteCurrentUser: async () => {
    const response = await fetch(`${apiUrl}/me`, {
      method: 'DELETE',
    });

    return handleResponse(response);
  },
};

export default api;

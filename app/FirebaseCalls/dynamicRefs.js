// * Dynamic Refs

// * Gets
export const getGroupdrivesOrEvents = (groupDrivesOrEvents) => {
  firebase
    .database()
    .ref(`${groupDrivesOrEvents}/`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

export const getUserData = (user) => {
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

export const getFriends = (user) => {
  firebase
    .database()
    .ref(`users/${user.uid}/friends`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

export const getEvent = (groupDriveOrEvents, eventId) => {
  firebase
    .database()
    .ref(`${groupDriveOrEvents}/${eventId}`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

export const getIsOnlineStatus = (uid) => {
  firebase
    .database()
    .ref(`live-data/${uid}/isOnline`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

export const getChat = (path) => {
  firebase
    .database()
    .ref(`messages/${path}`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

// * Sets
// ! these are slightly off from what they should be

export const setLocation = (uid) => {
  firebase
    .database()
    .ref(`live-data/${uid}`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

export const setChat = (path, timeStamp) => {
  firebase
    .database()
    .ref(`messages/${path}/${timeStamp}`)
    .once("value", (snapshot) => {
      return snapshot.val();
    });
};

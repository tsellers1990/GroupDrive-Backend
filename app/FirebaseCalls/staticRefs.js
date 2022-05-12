// * Static Refs
const eventsRef = firebase.database().ref("events/");
const userDB = firebase.database().ref(`users/`);
const feedbackRef = firebase.database().ref("feedback/");
const messagesRef = firebase.database().ref(`messages/`);

// * Gets

export const getEventsData = () => {
  eventsRef.once("value", (snapshot) => {
    return snapshot.val();
  });
};

export const getUserDB = () => {
  userDB.once("value", (snapshot) => {
    return snapshot.val();
  });
};

export const getFeedbackMessageData = () => {
  feedbackRef.once("value", (snapshot) => {
    return snapshot.val();
  });
};

export const getMessageData = () => {
  messagesRef.once("value", (snapshot) => {
    return snapshot.val();
  });
};

// * Sets

export const setEventsData = (eventsObj) => {
  eventsRef.push(eventsObj);
};

export const setUserDB = (userObj) => {
  userDB.push(userObj);
};

export const setFeedbackMessageData = (feedbackObj) => {
  feedbackRef.push(feedbackObj);
};

export const setMessageData = (messageObj) => {
  messagesRef.push(messageObj);
};

// * Updates

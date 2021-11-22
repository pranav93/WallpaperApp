import React from "react";

const App = () => (
  <>
    <h1>App Component</h1>
    <button
      onClick={() => {
        electron.notificationApi.sendNotification("My custom notification");
      }}
    >
      Notify
    </button>
  </>
);

export default App;

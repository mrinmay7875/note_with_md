function About() {
  return (
    <div>
      <h1>About Our Note-Taking App</h1>
      <p>
        Welcome to our simple yet powerful note-taking application! This app is
        designed to help you keep track of your thoughts, ideas, and reminders
        in a convenient and efficient way. Here are some key points about how
        our application works and ensures the safety of your data:
      </p>

      <h2>Privacy and Data Security</h2>
      <p>
        We understand that privacy and data security are important to our users.
        That's why our application does not handle any sensitive data or make
        any network or API calls. All the notes you create and manage are stored
        locally in your browser's local storage. This means that:
      </p>
      <ul>
        <li>
          <strong>Your data stays on your device:</strong> Since we use local
          storage, all your notes are stored locally on your device. There is no
          transmission of data over the internet, ensuring complete privacy.
        </li>
        <li>
          <strong>No external access:</strong> As your data is not sent to any
          external servers, there is no risk of unauthorized access or data
          breaches. Only you have access to your notes.
        </li>
      </ul>

      <h2>User Responsibility</h2>
      <p>
        While we ensure that your notes are stored securely on your device, it
        is important to note that:
      </p>
      <ul>
        <li>
          <strong>Backup your data:</strong> Since the data is stored locally,
          it is tied to the browser and device you are using. We recommend
          regularly backing up your important notes manually.
        </li>
        <li>
          <strong>Avoid clearing browser data:</strong> Clearing your browser's
          local storage or resetting your browser settings will delete all your
          notes. Please be cautious when performing such actions.
        </li>
      </ul>

      <h2>Simple and Intuitive</h2>
      <p>
        Our note-taking app is designed to be simple and intuitive. You can
        easily add, edit, and delete notes with just a few clicks. We aim to
        provide a seamless user experience without any unnecessary complexity.
      </p>

      <p>
        Thank you for using our note-taking application. We hope it helps you
        stay organized and productive!
      </p>
    </div>
  );
}

export default About;

// // import logo from './logo.svg';
// import './App.css';
// import React from 'react';
// import VoiceRecorder from './components/VoiceRecorder';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   // Sample function to trigger a toast notification
//   const handleButtonClick = () => {
//     toast.success("This is a success toast!");
//   };
//   return (
//     <div className="App">
//       {/* ToastContainer for global toast configurations */}
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <h1>Voice Recorder App</h1>
//       <VoiceRecorder />
//       <button onClick={handleButtonClick}>Show Toast</button>
//       {/* Other components or content you might have */}
//     </div>
//   );
// }

// export default App;

import './App.css';
import React from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h1>Voice Recorder App</h1>
            <VoiceRecorder />
            {/* Other components or content you might have */}
        </div>
    );
}

export default App;

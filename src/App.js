import React from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import UploadMusic from './components/UploadMusic'; // Import the new component
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
            <UploadMusic /> {/* Add the new UploadMusic component */}
            {/* Other components or content you might have */}
        </div>
    );
}

export default App;

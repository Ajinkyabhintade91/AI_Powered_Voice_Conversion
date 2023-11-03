
import React, { useState, useEffect } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecordedVoicesList from './components/RecordedVoicesList';

function App() {
    const [recordedVoices, setRecordedVoices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/recorded-voices')
            .then((response) => response.json())
            .then((data) => {
                setRecordedVoices(data);
            })
            .catch((error) => {
                console.error('Error fetching recorded voices:', error);
            });
    }, []);

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
            <RecordedVoicesList recordedVoices={recordedVoices} />
        </div>
    );
}

export default App;


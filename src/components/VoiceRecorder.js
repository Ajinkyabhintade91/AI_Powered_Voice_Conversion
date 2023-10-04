import React, { useState, useRef, useEffect  } from 'react';
import { FaMicrophone, FaStop, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VoiceRecorder() {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const audioChunks = useRef([]);
    const mediaRecorder = useRef(null);

    useEffect(() => {
        return () => {
            if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
                mediaRecorder.current.stop();
                mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const allowed_file = (filename) => {
        const ALLOWED_EXTENSIONS = ['wav', 'webm'];
        return ALLOWED_EXTENSIONS.includes(filename.split('.').pop().toLowerCase());
    };

    const startRecording = () => {
        audioChunks.current = [];
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder.current = new MediaRecorder(stream);
                mediaRecorder.current.ondataavailable = event => {
                    audioChunks.current.push(event.data);
                };
                mediaRecorder.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioURL(url);
                };
                mediaRecorder.current.start();
                setRecording(true);
            })
            .catch(err => {
                console.error("Error accessing microphone:", err);
            });
    };

    const stopRecording = () => {
        mediaRecorder.current.stop();
        setRecording(false);
    };

    const saveRecording = () => {
        const fileType = prompt("Which file type would you like to save as? (wav/webm)", "wav");
        if (!allowed_file(`file.${fileType}`)) {
            toast.error("Invalid file type selected.");
            return;
        }

        const formData = new FormData();
        formData.append('file', new Blob(audioChunks.current, { type: `audio/${fileType}` }), `recording.${fileType}`);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            toast.success(data.message);
        })
        .catch(error => {
            console.error("Error uploading recording:", error);
            toast.error("Error uploading recording.");
        });
    };

    return (
        <div className="voice-recorder">
            {/* <button onClick={startRecording} disabled={recording}><FaMicrophone /></button> */}
            <button onClick={startRecording} disabled={recording} style={recording ? {backgroundColor: 'red'} : {}}><FaMicrophone /></button>
            <button onClick={stopRecording} disabled={!recording}><FaStop /></button>
            {audioURL && <audio src={audioURL} controls />}
            {audioURL && <button onClick={saveRecording} disabled={!audioURL}><FaSave /></button>}
            {/* {audioURL && <button onClick={saveRecording}><FaSave /></button>} */}
        </div>
    );
}

export default VoiceRecorder;

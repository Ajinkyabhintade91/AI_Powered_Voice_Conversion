import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function UploadMusic() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDrop = (acceptedFiles) => {
        // Handle the selected file(s) here
        setSelectedFile(acceptedFiles[0]);
    };

    return (
        <div>
            <h2>Upload Music</h2>
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag & drop or click to select a music file</p>
                    </div>
                )}
            </Dropzone>
            {selectedFile && (
                <div>
                    <p>Selected file: {selectedFile.name}</p>
                    {/* Add a button to process the file */}
                </div>
            )}
        </div>
    );
}

export default UploadMusic;

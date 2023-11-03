import React from 'react';

function RecordedVoicesList({ recordedVoices }) {
  return (
    <div className="recorded-voices-list">
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {recordedVoices.map((audioURL, index) => (
            <tr key={index}>
              <td>{audioURL}</td>
              <td>
                <audio controls>
                  <source src={`http://localhost:5000/uploads/${audioURL}`} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordedVoicesList;
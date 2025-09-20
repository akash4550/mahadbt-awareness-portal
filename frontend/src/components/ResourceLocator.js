import React from 'react';

const ResourceLocator = () => {
    // This is the corrected Google Maps search URL
    const googleMapsUrl = `https://www.google.com/maps/search/`;

    return (
        <section id="resources">
            <h2>Find Nearby Resources</h2>
            <p>Use these links to find the nearest bank branch or Aadhaar Seva Kendra to complete your seeding process.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
                <a href={googleMapsUrl + 'bank+near+me'} target="_blank" rel="noopener noreferrer">
                    <button>Find a Bank Near Me</button>
                </a>
                <a href={googleMapsUrl + 'aadhaar+seva+kendra+near+me'} target="_blank" rel="noopener noreferrer">
                    <button>Find an Aadhaar Center Near Me</button>
                </a>
            </div>
        </section>
    );
};

export default ResourceLocator;
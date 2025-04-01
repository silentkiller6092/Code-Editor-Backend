import React, { useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";

function FullView_Preview() {
    const { redirectionUrl } = useParams();
    const iframeRef = useRef(null);

    // Decode the URL here
    const decodedUrl = decodeURIComponent(redirectionUrl);

    useEffect(() => {
        if (iframeRef.current && decodedUrl) {
            iframeRef.current.src = decodedUrl;
        }
    }, [decodedUrl]);

    return (
        <div>
            <h1>Preview Page</h1>
            <iframe
                ref={iframeRef}
                title="Preview"
                src="loading.html"
                className="h-screen m-0 bg-slate-950"
                onLoad={() => {
                    // Optionally handle onLoad if needed, like removing a loading screen
                }}
            ></iframe>
        </div>
    );
}

export default FullView_Preview;
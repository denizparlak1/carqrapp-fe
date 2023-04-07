import React, { useEffect } from "react";

const AdSense = (props) => {
    useEffect(() => {
        if (window) {
            try {
                window.adsbygoogle = window.adsbygoogle || [];
                window.adsbygoogle.push({});
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <div className="ad">
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={props.client}
                data-ad-slot={props.slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSense;

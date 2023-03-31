import React from 'react';

export const adSenseCode = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2856879062144826"
     crossorigin="anonymous"></script>
<!-- Qr App User Page -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2856879062144826"
     data-ad-slot="8069530234"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

const AdSense = () => {
    return (
        <div dangerouslySetInnerHTML={{ __html: adSenseCode }} />
    );
};

export default AdSense;

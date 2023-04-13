import React from 'react';

import '../Notifications.scss'

const ServerError = () => {
    return (
        <section className="notification__wrapper">
            <p className="notification__description">The system is currently experiencing difficulties;
                please try again. </p>
            <p className="notification__description">If problem persists, please contact customer service.</p>
        </section>
    );
};

export default ServerError;

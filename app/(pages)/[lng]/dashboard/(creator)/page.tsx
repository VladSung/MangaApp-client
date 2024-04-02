import React from 'react';


const CreatorDashboard = async () => {
    const data: string = await new Promise((resolve) => {
        resolve('Tested data');
    });

    return <div>{data}</div>;
};

export default CreatorDashboard;

import React from 'react';
import Hemlet from 'react-helmet';

const MetaData = ({ title }) => {
    return (
        <Hemlet>
            <title>{title}</title>
        </Hemlet>
    )
}

export default MetaData;

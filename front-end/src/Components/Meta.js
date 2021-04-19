import React from 'react';
import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/> 
        <meta name="keywords" content={keywords}/> 
  
      </Helmet>
    );
};
Meta.defaultProps = {
    title: 'Welcome to Pro Shop',
    keywords:'cheap electronics,best electronics,electronics',
    description: 'we sell best electronics in cheap price'
}
export default Meta;
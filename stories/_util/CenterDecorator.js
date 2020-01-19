import './index.css'
import React from 'react'
const styles = {
    padding: 20,
    minHeight: '100vh'
};
export default storyFn => <div style={styles}>{storyFn()}</div>;
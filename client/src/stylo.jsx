import React from 'react';

const CanvaEmbed = () => {
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '0',
    paddingTop: '62.5%',
    paddingBottom: '0',
    boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
    marginTop: '1.6em',
    marginBottom: '0.9em',
    overflow: 'hidden',
    borderRadius: '8px',
    willChange: 'transform',
  };

  const iframeStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    border: 'none',
    padding: '0',
    margin: '0',
  };

  return (
    <div>
      <div style={containerStyle}>
        <iframe
          loading="lazy"
          style={iframeStyle}
          src="https://www.canva.com/design/DAGH-en7n8M/oHO559v9Wflhk_fHGihwzA/view?embed"
          allowFullScreen
        ></iframe>
      </div>
      <a
        href="https://www.canva.com/design/DAGH-en7n8M/oHO559v9Wflhk_fHGihwzA/view?utm_content=DAGH-en7n8M&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>{' '}
    </div>
  );
};

export default CanvaEmbed;

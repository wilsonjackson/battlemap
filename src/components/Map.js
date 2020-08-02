import React, {useCallback, useEffect, useState} from "react";

const placeHolder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const saveCurrentMap = mapData => {
  window.localStorage.setItem('saved_map', JSON.stringify(mapData));
};

const reloadLastMap = () => {
  const mapData = window.localStorage.getItem('saved_map');
  return mapData && JSON.parse(mapData);
};

export default function Map({update, onSelect}) {
  const [mapSrc, updateMapSrc] = useState(placeHolder);
  const input = React.createRef();

  const updateBounds = useCallback(() => {
    if (!input.current || input.current.src === placeHolder)
      return;
    const bounds = input.current.getBoundingClientRect();
    update({
      bounds: {
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height
      }
    });
  }, [update, input]);

  const loadMap = useCallback(file => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const contents = e.target.result.toString();
      updateMapSrc(contents);
      saveCurrentMap({name: file.name, contents});
    }
    reader.readAsDataURL(file);
    onSelect(file.name);
  }, [onSelect]);

  useEffect(() => {
    const preventDefault = e => {
      e.preventDefault();
    };
    const receiveFile = e => {
      e.preventDefault();
      loadMap(e.dataTransfer.files[0]);
    };
    window.addEventListener('resize', updateBounds);
    window.addEventListener('dragover', preventDefault);
    window.addEventListener('drop', receiveFile);
    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('dragover', preventDefault);
      window.removeEventListener('drop', receiveFile);
    }
  }, [loadMap, updateBounds]);

  useEffect(() => {
    // Delay initialization of saved map to wait for all components to finish registering their load handlers
    setTimeout(() => {
      const mapData = reloadLastMap();
      if (mapData) {
        updateMapSrc(mapData.contents);
        onSelect(mapData.name);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <img src={mapSrc} ref={input} onLoad={updateBounds} alt="drag &amp; drop map"/>
  );
}

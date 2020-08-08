import React from 'react';
import './BackgroundLayers.css';

export default function BackgroundLayers() {
  const show = false;
  return show && (
    <div className="background-layers">Hello</div>
  );
}
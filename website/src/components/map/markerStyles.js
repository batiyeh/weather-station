import React from 'react';
import { Transition } from 'react-transition-group';

export const MARKER_SIZE = 60; // Size of the marker on the map
const duration = 200; // Duration of any animations

// Function to return marker styles for a marker's location
// and hover status
export function getMarkerStyle(hover, origin) {
    var size = MARKER_SIZE;
    var scale = hover ? 1.0 : .65;
    var zIndex = hover ? 999 : -1;
    var translateDistance = hover ? 0 : -((size * scale) - size) / 2;
  
    return {
        position: 'absolute',
        width: MARKER_SIZE,
        height: MARKER_SIZE,
        left: -MARKER_SIZE / 2,
        top: -(MARKER_SIZE),
        fontSize: size,
        color: '#27ACAC',
        zIndex: zIndex,
        padding: 4,
        cursor: 'pointer',
        willChange: 'transform',
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'no-repeat',
        transform: `scale(${scale} , ${scale}) translateY(${translateDistance}px)`,
        WebkitTransform: `scale(${scale} , ${scale}) translateY(${translateDistance}px)`,
        transition: 'transform 0.25s ease',
        WebkitTransition: 'transform 0.25s ease',
    };
}

// Styling to change the order of the marker zIndexes on hover
export function getContainerStyle(hover){
    var zIndex = hover ? 999 : -1;
    return {
        zIndex: zIndex
    }
}

// Styles for the additional station info box that appears when 
// hovering over a marker
export const infoStyle = {
    position: "absolute",
    bottom: MARKER_SIZE + 2,
    left: "-27px",
    minWidth: "175px",
    fontSize: "10pt",
    padding: "10px",
    backgroundColor: "#394c73",
    color: "#fff",
    boxShadow: "0px 0px 10px 0px #707070",
    cursor: "pointer",
    transition: `opacity ${duration}ms ease-in-out`,
    transitionProperty: 'opacity, transform',
    textAlign: "left",
    opacity: 0,
}

// Transition state styling
const infoTransitionStyles = {
    entering: { 
        opacity: 0,
        transform: 'translateY(20%)'
    },
    entered: { 
        opacity: 1,
        transform: 'translateY(0)',
    },
    exiting: {
        opacity: 0,
        transform: 'translateY(20%)'
    }
};

// Fade and slide up animation to render the additional marker info box
export const FadeAndSlideUp = ({ children, in: inProp  }) => (
    <Transition in={inProp} timeout={duration}>
        {
            (state) => {
                return (
                    <div style={{...infoStyle, ...infoTransitionStyles[state]}} 
                    className="marker-info-box">
                        { children }
                    </div>
            )}
        }
    </Transition>
);
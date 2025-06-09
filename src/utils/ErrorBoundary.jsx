import React, { Component } from 'react';
import './errorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary-container">
          <div className="errorBoundary-image-wrapper">
            <img
              className="errorBoundary-image desktop"
              src="https://i.ibb.co/v30JLYr/Group-192-2.png"
              alt="Error"
            />
            <img
              className="errorBoundary-image tablet"
              src="https://i.ibb.co/c1ggfn2/Group-193.png"
              alt="Error"
            />
            <img
              className="errorBoundary-image mobile"
              src="https://i.ibb.co/8gTVH2Y/Group-198.png"
              alt="Error"
            />
          </div>
          <div className="errorBoundary-content">
            <h1 className="errorBoundary-title">
              Looks like you've found the doorway to the great nothing
            </h1>
            <p className="errorBoundary-text">
              The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link.
            </p>
            <p className="errorBoundary-text">
              Sorry about that! Please visit our homepage to get where you need to go.
            </p>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="errorBoundary-button"
            >
              Go back to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

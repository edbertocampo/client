import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    //log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      //render a custom fallback UI here
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

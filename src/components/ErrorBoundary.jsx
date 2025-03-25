import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2 style={{ color: "red", textAlign: "center", marginTop : "50%" , marginBottom:"50%" ,marginRight:"50%" , marginLeft:"50%" }}>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

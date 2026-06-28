"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-chat-border bg-chat-card p-6 text-center">
          <p className="text-sm text-chat-muted">
            Something went wrong loading this section.
          </p>
          <button
            onClick={this.handleRetry}
            className="rounded-md bg-chat-accent px-4 py-2 text-sm text-white transition-colors hover:bg-chat-accent-strong"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

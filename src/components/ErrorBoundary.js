
import React,{ Component} from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.log(error, info);
    }

    render() {
      if (this.state.hasError) {
        return (
            <main className="not-found">
            <i className="fas fa-sad-cry"></i>
              <h3>Something went wrong with the site. We are working on it!</h3>
              <p>We apologize for any inconvenience caused and thank you for your understanding!</p>
            </main>
            );
      }

      return this.props.children; 
    }
}

export default ErrorBoundary;
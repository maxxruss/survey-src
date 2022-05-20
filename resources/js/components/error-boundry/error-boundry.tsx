import React, { useState } from 'react';
import ErrorIndicator from '../error-indicator';

type Props = {
  children: any;
  exact: boolean;
  path: string;
};

const ErrorBoundry = (props:Props) => {
const [error, setError] = useState(false)

try{
  
}


  if (error) {
    return <ErrorIndicator />;
  } else {
    return props.children
  }


}

export default class ErrorBoundry extends Component {
  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    
  }
}

export default ErrorBoundry
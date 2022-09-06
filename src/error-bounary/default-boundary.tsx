import React, {ComponentType} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import SafeAreaView from 'react-native-safe-area-view';

export interface DefaultBoundaryProps {
  children: React.ReactNode;
  FallbackComponent: ComponentType<any>;
  onError?: Function;
}

export interface DefaultBoundaryState {
  hasError: boolean;
}

class DefaultBoundary extends React.Component<
  DefaultBoundaryProps,
  DefaultBoundaryState
> {
  constructor(props: DefaultBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error: Error) {
    crashlytics().recordError(error);
  }

  render() {
    const {FallbackComponent} = this.props;

    if (this.state.hasError) {
      return (
        <SafeAreaView forceInset={{top: 'always', bottom: 'never'}}>
          <FallbackComponent />
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default DefaultBoundary;

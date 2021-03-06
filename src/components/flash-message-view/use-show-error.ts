import * as React from 'react';
import { createErrorPresenter } from '../../presenters/error-presenter';
import { uiStore } from '../../stores';

export function useShowError(error?: Error | null) {
  React.useEffect(() => {
    if (error) {
      const errorPresenter = createErrorPresenter(error);
      uiStore.showFlashMessage({
        message: errorPresenter.userMessage,
        title: errorPresenter.userTitle,
        type: 'error',
      });
    }
  }, [error]);
}

import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LoadingView } from 'draft-components';
import { AsyncStatus } from '../../types';
import { ROUTES } from '../../constants';
import { sessionStore, userStore } from '../../stores';
import { useBorderedHeader } from '../../components/header';
import { ErrorView } from '../../components/error-view';

export interface AuthenticatorProps {
  children: JSX.Element;
}

export function Authenticator({ children }: AuthenticatorProps) {
  const history = useHistory();
  const { params } = useRouteMatch<{ userId: string }>();

  useBorderedHeader(true);

  React.useEffect(() => {
    const savedUser = userStore.get(params.userId);
    const authUser = userStore.get(sessionStore.authenticatedUserId);
    if (!savedUser) {
      history.replace(ROUTES.home);
    } else if (savedUser !== authUser) {
      sessionStore.authenticate(savedUser.accessToken);
    }
  }, [params.userId, history]);

  if (
    sessionStore.authStatus === AsyncStatus.idle ||
    sessionStore.authStatus === AsyncStatus.pending
  ) {
    return (
      <LoadingView>
        <FormattedMessage
          id="screens.Authenticator.authenticating"
          defaultMessage="Checking Access Token..."
        />
      </LoadingView>
    );
  }

  if (sessionStore.authStatus === AsyncStatus.error && sessionStore.authError) {
    return <ErrorView error={sessionStore.authError} />;
  }

  return children;
}

import * as React from 'react';
import * as mobxReact from 'mobx-react-lite';
import { sessionStore } from '../../stores';
import { useBorderedHeader } from '../../components/header';
import { useShowError } from '../../components/flash-message-view';
import { AccessTokenHelp } from '../../components/access-token-help';
import styles from './home.module.scss';

export const Home = mobxReact.observer(function Home() {
  const [isHeaderBordered, setIsHeaderBordered] = React.useState(false);

  useBorderedHeader(isHeaderBordered);
  useShowError(sessionStore.authError);

  return (
    <div
      className={styles.container}
      onScroll={(event) => {
        setIsHeaderBordered(event.currentTarget.scrollTop > 0);
      }}
    >
      <div className={styles.content}>
        <AccessTokenHelp />
      </div>
    </div>
  );
});

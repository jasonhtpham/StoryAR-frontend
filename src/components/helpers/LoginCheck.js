import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { API, socketAuthCallback } from 'helpers';
import { ConnectionConfig } from 'constants/index';
import { LoginContext } from 'contexts';

export const LoginCheck = (props) => {
  const { accessToken } = useContext(LoginContext);
  useEffect(() => {
    if (!ConnectionConfig.bypassBackend && accessToken)
      if (ConnectionConfig.useAccessTokenVerificationAPI) {
        (async () => {
          let apiResponse = await API.accessTokenLogin();
          if (apiResponse.success) {
            if (ConnectionConfig.socket.initSocket)
              if (ConnectionConfig.socket.accessTokenVerification)
                socketAuthCallback(apiResponse.data);
          }
        })();
      }
  }, [accessToken]);
  return (<div>{props.children}</div>);
};

LoginCheck.propTypes = {
  children: PropTypes.node.isRequired
};

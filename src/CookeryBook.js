'use strict';

require('bootstrap/less/bootstrap.less');

import React from 'react/addons';
import CookeryBookWrapper from 'components/CookeryBookWrapper';

React.initializeTouchEvents(true);

React.render(<CookeryBookWrapper />, document.getElementById('cookery-book'));


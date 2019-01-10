/**
 * Copyright (c) 2018-Physalix, Fabrice Sommavilla.
 * Licensed under the MIT License (MIT).
 * See https://github.com/flasomm/react-starter-boilerplate
 * @date  06/07/2018
 */

import moment from 'moment';

export const formatIsoDate = date => moment(date).format('DD/MM/YYYY HH:mm');

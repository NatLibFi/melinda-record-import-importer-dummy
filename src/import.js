#!/usr/bin/env node
/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Dummy importer for the Melinda record batch import system
*
* Copyright (C) 2018 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-importer-dummy
*
* melinda-record-import-importer-dummy program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-importer-dummy is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

import {Utils} from '@natlibfi/melinda-commons';
import {RECORD_IMPORT_STATE} from '@natlibfi/melinda-record-import-commons';

const {createLogger} = Utils;

export default function () {
	const Logger = createLogger();

	return async message => {
		Logger.log('debug', 'Dummy importer! Dosent import records to Melinda');
		if (message) {
			Logger.log('debug', `Got data from blob: ${message.fields.routingKey}, record ${message.fields.deliveryTag}`);
		}
		return {status: RECORD_IMPORT_STATE.SKIPPED, metadata: {title: 'Dummy record', standardIdentifiers: ` ${message.fields.deliveryTag}-dummy-record`}};
	};
}

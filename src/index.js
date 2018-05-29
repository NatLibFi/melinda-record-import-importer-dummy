#!/usr/bin/env node
/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* Dummy importer for the Melinda record batch import system
*
* Copyright (C) 2018 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-importer-devnull
*
* melinda-record-import-importer-devnull program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-importer-devnull is distributed in the hope that it will be useful,
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

'use strict';

import {ImporterUtils as utils} from '@natlibfi/melinda-record-import-commons';

start();

async function start() {
	const logger = utils.createLogger();

	utils.registerSignalHandlers();
	utils.checkEnv();

	const stopHealthCheckService = utils.startHealthCheckService(process.env.HEALTH_CHECK_PORT);

	try {
		await utils.startImport(callback);
		stopHealthCheckService();
		process.exit();
	} catch (err) {
		stopHealthCheckService();
		logger.error(err);
		process.exit(-1);
	}

	async function callback(message) { // eslint-disable-line no-unused-vars
		const id = new Date().getTime();
		logger.debug(`Created a dummy message with id ${id} from the following data: ${message.content.toString()}`);
		return {id, status: 'CREATED'};
	}
}

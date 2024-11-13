import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ShipBob implements ICredentialType {
    name = 'shipBobApi';
    displayName = 'ShipBob API';
    documentationUrl = 'shipBob';
    properties: INodeProperties[] = [
        {
            displayName: 'Personal Access Token',
            name: 'apiKey',
            type: 'string',
            default: '',
            placeholder: 'Your ShipBob Personal Access Token',
            description: 'Enter your ShipBob API Personal Access Token to authenticate requests.',
        },
    ];
}

export default ShipBob; // Exporting the default class to simplify the import/export process.


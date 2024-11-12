// Imports for n8n credentials
import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ShipBobApi implements ICredentialType {
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

// Note: The Personal Access Token (PAT) is used for authentication in all API requests.

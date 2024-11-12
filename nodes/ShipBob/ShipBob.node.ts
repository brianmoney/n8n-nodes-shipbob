// Imports for n8n
import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeProperties, INodeType, INodeTypeDescription, NodeApiError } from 'n8n-workflow';
import axios from 'axios';

export class ShipBob implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ShipBob',
        name: 'shipBob',
        icon: 'file:shipbob.png',
        group: ['transform'],
        version: 1,
        description: 'Consume ShipBob API',
        defaults: {
            name: 'ShipBob',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'shipBobApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Order',
                        value: 'order',
                    },
                    {
                        name: 'Product',
                        value: 'product',
                    },
                    {
                        name: 'Inventory',
                        value: 'inventory',
                    },
                    {
                        name: 'Return',
                        value: 'return',
                    },
                ],
                default: 'order',
                description: 'The resource to operate on.',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: [
                            'order',
                            'product',
                            'inventory',
                            'return',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get All',
                        value: 'getAll',
                        description: 'Retrieve all items of the selected resource',
                    },
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Retrieve a single item by ID',
                    },
                    {
                        name: 'Create',
                        value: 'create',
                        description: 'Create a new item',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        description: 'Update an existing item',
                    },
                ],
                default: 'getAll',
                description: 'The operation to perform.',
            },
            // Additional properties for operations (e.g., ID for get, etc.)
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: [
                            'get',
                            'update',
                        ],
                    },
                },
                default: '',
                description: 'The ID of the item to retrieve or update.',
            },
            {
                displayName: 'Data',
                name: 'data',
                type: 'json',
                displayOptions: {
                    show: {
                        operation: [
                            'create',
                            'update',
                        ],
                    },
                },
                default: '',
                description: 'The data for the create or update operation.',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const credentials = await this.getCredentials('shipBobApi');

        const apiUrl = 'https://api.shipbob.com/1.0';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.apiKey}`,
        };

        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i) as string;
            const operation = this.getNodeParameter('operation', i) as string;

            let responseData;
            try {
                switch (resource) {
                    case 'order':
                        if (operation === 'getAll') {
                            responseData = await axios.get(`${apiUrl}/orders`, { headers });
                        } else if (operation === 'get') {
                            const id = this.getNodeParameter('id', i) as string;
                            responseData = await axios.get(`${apiUrl}/orders/${id}`, { headers });
                        } else if (operation === 'create') {
                            const data = this.getNodeParameter('data', i) as object;
                            responseData = await axios.post(`${apiUrl}/orders`, data, { headers });
                        } else if (operation === 'update') {
                            const id = this.getNodeParameter('id', i) as string;
                            const data = this.getNodeParameter('data', i) as object;
                            responseData = await axios.put(`${apiUrl}/orders/${id}`, data, { headers });
                        }
                        break;
                    case 'product':
                        // Implement similar logic for products
                        break;
                    case 'inventory':
                        // Implement similar logic for inventory
                        break;
                    case 'return':
                        // Implement similar logic for returns
                        break;
                }
                returnData.push({ json: responseData.data });
            } catch (error) {
                throw new NodeApiErrorError(`ShipBob API request failed: ${error.message}`);
            }
        }

        return this.prepareOutputData(returnData);
    }
}

// Note: Ensure to properly handle response formats and error checking for each API endpoint.

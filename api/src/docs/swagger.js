const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Files Aggregation API',
      version: '1.0.0',
      description: 'API that aggregates CSV data from the Echo service.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Bearer token used to call the Echo external API.'
        }
      },
      schemas: {
        FileLine: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              example: 'RgTya'
            },
            number: {
              type: 'integer',
              example: 64075909
            },
            hex: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{32}$',
              example: '70ad29aacf0b690b0467fe2b2767f765'
            }
          },
          required: ['text', 'number', 'hex']
        },
        FileData: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              example: 'file1.csv'
            },
            lines: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/FileLine'
              }
            }
          },
          required: ['file', 'lines']
        },
        FilesResponse: {
          type: 'object',
          properties: {
            files: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/FileData'
              }
            }
          },
          required: ['files']
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Failed to fetch file data'
            },
            details: {
              type: 'object',
              additionalProperties: true,
              nullable: true
            }
          },
          required: ['message']
        }
      }
    }
  },
  apis: []
}

const swaggerSpec = swaggerJsdoc(options)

swaggerSpec.paths = {
  '/files/data': {
    get: {
      summary: 'Retrieve formatted data from external CSV files',
      description:
        'Fetches file names from the Echo API, downloads each CSV, filters out invalid lines, and returns the aggregated result.',
      tags: ['Files'],
      responses: {
        200: {
          description: 'Collection of files with their valid lines.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FilesResponse'
              }
            }
          }
        },
        502: {
          description: 'Upstream service failure.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Unhandled error.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  }
}

module.exports = swaggerSpec

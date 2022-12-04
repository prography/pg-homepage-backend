import { ApiBody } from '@nestjs/swagger';

export const ApiMultiFile =
  (fileName: string = 'files'): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: 'multipart/form-data',
      required: true,
      schema: {
        $ref: '#/components/schemas/',
        type: 'object',
        properties: {
          [fileName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
            },
          },
          teamName: {
            type: 'string',
          },
          teamMembers: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: '["이재준","윤세림","주윤겸","장지훈"]',
          },
          projectName: {
            type: 'string',
          },
          projectDescription: {
            type: 'string',
          },
          generationId: {
            type: 'number',
          },
          frameworks: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

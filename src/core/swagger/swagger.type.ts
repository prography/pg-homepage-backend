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
            type: 'string',
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
            type: 'string',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

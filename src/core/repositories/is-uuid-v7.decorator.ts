import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

const UUID_V7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function IsUUIDv7(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUUIDv7',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && UUID_V7_REGEX.test(value);
        },
        defaultMessage() {
          return 'O valor informado deve ser um UUID v7 válido.';
        }
      }
    });
  };
}

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Si no es un texto, class-validator fallará aquí de inmediato de forma segura
          if (typeof value !== 'string') return false;

          const analysis = analyzePassword(value);
          return analysis.level !== 'débil';
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.value;

          // Si el valor no es una cadena válida por alguna razón externa
          if (typeof value !== 'string') {
            return 'La contraseña debe ser una cadena de texto válida.';
          }

          // Analizamos aquí de forma segura para construir el mensaje
          const analysis = analyzePassword(value);
          return `La contraseña ingresada es ${analysis.level.toUpperCase()}. ${analysis.error}`;
        },
      },
    });
  };
}

// Función auxiliar para clasificar la contraseña (Se mantiene igual)
function analyzePassword(password: string): { level: 'débil' | 'intermedio' | 'fuerte'; error: string } {
  if (password.length < 8) {
    return { level: 'débil', error: 'Debe tener al menos 8 caracteres.' };
  }

  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Caso 1: Débil (Solo letras o solo números)
  if ((hasLetters && !hasNumbers) || (!hasLetters && hasNumbers)) {
    return { level: 'débil', error: 'Es muy simple. Combina letras y números.' };
  }

  // Caso 3: Fuerte (Tiene mayúsculas, minúsculas, números y caracteres especiales)
  if (hasMixedCase && hasNumbers && hasSpecial) {
    return { level: 'fuerte', error: '' };
  }

  // Caso 2: Intermedio (Cualquier punto medio entre débil y fuerte)
  return { 
    level: 'intermedio', 
    error: 'Para que sea FUERTE, intenta añadir mayúsculas, minúsculas y caracteres especiales (#,$,%,etc.).' 
  };
}
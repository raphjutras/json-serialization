import 'reflect-metadata';
import {
  JsonSerializationConfig,
  JSON_PROPERTY_KEY
} from "./shared";

export function isObject(target: any): boolean {
  return typeof target === 'object';
}

export function isArray(target: Function): boolean {
  if (target === Array) { return true; }
  return Object.prototype.toString.call(target) === '[object Array]';
}

export function isPrimitiveType(data: any): boolean {
  return !!(['string', 'boolean', 'number'].indexOf((typeof data)) > -1 || (data instanceof String || data === String ||
    data instanceof Number || data === Number ||
    data instanceof Boolean || data === Boolean));
}

export function getPropertyMetadata<T>(target: any, propertyKey: string): JsonSerializationConfig<T> {
  return Reflect.getMetadata(JSON_PROPERTY_KEY, target, propertyKey);
}

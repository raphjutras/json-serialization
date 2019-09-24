import {
  getPropertyMetadata,
  isArray,
  isPrimitiveType
} from "./json-helper";
import { IJsonObject } from "./json-deserializer";

/**
 * Serializes the target object instance to json object
 * @param targetInstance The target object instance to be serialized
 * @return Serialized JSON Object
 */
export function serialize<T>(targetInstance: T): IJsonObject {
  if (!targetInstance) {
    throw new Error(`Cannot parse the target instance of undefined.`);
  }
  return serializeObject(targetInstance);
}

function serializeObject(targetInstance: any): any {
  if (typeof (targetInstance) !== 'object') { return targetInstance; }

  let jsonObject: any = {};
  Object.keys(targetInstance).forEach((propertyKey) => {
    let propertyMetadata = getPropertyMetadata(targetInstance, propertyKey);
    if (!propertyMetadata) { return undefined; }

    jsonObject[(propertyMetadata && propertyMetadata.name) || propertyKey] =
      serializeProperty(targetInstance, propertyKey);
  });
  return jsonObject;
}

function serializeProperty(targetInstance: any, propertyKey: string): any {
  let propertyMetadata = getPropertyMetadata(targetInstance, propertyKey);
  if (!propertyMetadata) { return undefined; }

  let hasCustomSerializer = propertyMetadata.serializer ? true : false;
  if (hasCustomSerializer) {
    let customSerializer = new propertyMetadata.serializer();
    return customSerializer && customSerializer.serialize(targetInstance[propertyKey]);
  }

  let propertyValue = targetInstance[propertyKey];
  if (!propertyMetadata.target) { return propertyValue; }

  if (isArray(propertyValue)) {
    let propertyArray = new Array(...propertyValue);
    return propertyArray.map((propItem: any) =>
      !propItem || isPrimitiveType(propItem) ? propItem : serializeObject(propItem)
    );
  }
  return serializeObject(propertyValue);
}

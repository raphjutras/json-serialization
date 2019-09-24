# json-serialization

> A typescript library for JSON object serialization.

## Install

```bash
npm install @peerlancers/json-serialization
```

or

```bash
yarn add @peerlancers/json-serialization
```

## Usage

Example Model Class
```typescript
export class Person {
  @JsonProperty()
  public firstName: string = undefined;

  @JsonProperty()
  public lastName: string = undefined;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

Example on how to use the deserialization
```typescript
import { JsonProperty, deserialize } from '@peerlancers/json-serialization';

const jsonObject: any = {
  firstName: 'John',
  lastName: 'Doe'
};

export class ApiService {
  public getPerson(): Person {
    return deserialize(Person, jsonObject);
  }
}
```

Example on how to use the serialization
```typescript
import { serialize } from '@peerlancers/json-serialization';

const personObject: Person = new Person();
personObject.firstName = 'John';
personObject.lastName = 'Doe';

export class ApiService {

  public setPerson(): Person {
    return serialize(personObject);
  }
}
```

You can also set your custom deserializer or serializer and it will output based on the predicate
```typescript
import { deserialize, serialize, IJsonDeserializer, IJsonSerializer } from '@peerlancers/json-serialization';

export enum Gender {
  Male = 1,
  Female = 2
}

export class GenderSerialization implements IJsonSerializer, IJsonDeserializer {
  public serialize(value: any): any {
    return `${Gender[value]}`;
  }

  public deserialize(value: any): any {
    return Gender[value];
  }
}

export class Person {
  @JsonProperty()
  public firstName: string = undefined;

  @JsonProperty({
    serializer: GenderSerialization,
    deserializer: GenderSerialization
  })
  public gender: Gender = undefined;
}

const personObject: Person = new Person();
personObject.firstName = 'John';
personObject.lastName = 'Doe';
personObject.gender = Gender.Male;

export class ApiService {

  public setPerson(): Person {
    return serialize(personObject);
  }
}
```

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/live-xxx.svg
[npm-url]: https://npmjs.org/package/live-xxx
[travis-image]: https://img.shields.io/travis/live-js/live-xxx/master.svg
[travis-url]: https://travis-ci.org/live-js/live-xxx
[coveralls-image]: https://img.shields.io/coveralls/live-js/live-xxx/master.svg
[coveralls-url]: https://coveralls.io/r/live-js/live-xxx?branch=master

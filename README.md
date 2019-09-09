# ts-object-mapper

> A typescript library for JSON object serialization.

## Install

```bash
npm install @peerlancers/ts-object-mapper
```

or

```bash
yarn add @peerlancers/ts-object-mapper
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
import { JsonProperty, deserialize } from '@peerlancers/ts-object-mapper';

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
import { serialize } from '@peerlancers/ts-object-mapper';

const personObject: Person = new Person();
personObject.firstName = 'John';
personObject.lastName = 'Doe';

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

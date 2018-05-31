# sjs-base-model

BaseModel helps translate data to models

## Install

With [Node.js](http://nodejs.org):

    $ npm install sjs-base-model
    
## Usage

```javascript
const apiData = {
        make: 'Tesla',
        model: 'Model S',
        YeAr: 2014,
        feature: {
            abs: true,
            airbags: true
        },
        colors: [{id: 'red', name: 'Red'}, {id: 'white', name: 'White'}]
}
```

```javascript
const carModel = new CarModel(apiData);
```

This is how you should extend `sjs-base-model`

```javascript
import {BaseModel} from 'sjs-base-model';
    
export default class CarModel extends BaseModel {
    
    make = '';
    model = '';
    year = null;
    feature = FeatureModel;
    colors = [ColorModel];
    
    constructor(data) {
        super();
        
        this.update(data);
    }
    
    update(data) {
        super.update(data);
        
        this.year = data.YeAr;
    }
    
}
```

Model Explained 

```javascript
import {BaseModel} from 'sjs-base-model';
    
export default class CarModel extends BaseModel {
    
    // The class properties must match the data properties being passed in. Otherwise they will be ignored
    make = '';
    model = '';
    year = null;
    
    // If data passed in is an object then a FeatureModel will be created
    // else the property will be set to null
    feature = FeatureModel;
    
    // If the data passed is an array then it will create a ColorModel for each item
    // else the property will be set to an empty array
    colors = [ColorModel];
    
    constructor(data) {
        super();
        
        this.update(data);
    }
    
    update(data) {
        super.update(data);
        
        // If the data doesn't match the property name
        // You can set the value(s) manually after the update super method has been called.
        this.year = data.YeAr;
        
        // Check out PropertyNormalizerModel example below on how to normalize you data to match the properties
        // so you don't need to do it manually.
    }
    
}
```

## BaseModel Conversion Types

`BaseModel` has the abiltiy to convert data when passed to the `update` method. For example if a string number was passed in `"2"` and you wanted to be an actual number `2` then you can give it the property name and associate it with the correct `ConversionTypeEnum`. Currently it only supports `number`, `float` and `boolean`. See below for an example:

```javascript
const json = {
    "seed": "abc",
    "results": "3", 	// We want this to be a boolean
    "page": "1", 		// We want this to be a number
    "version": "1.1" 	// We want this to be a float number
};

const model = new SomeModel(json);
```     

JavaScript Version

```javascript
import {BaseModel, ConversionTypeEnum} from 'sjs-base-model';

export default class SomeModel extends BaseModel {

    seed = '';
    results = false; // Was a string but converted into a boolean by IConversionOption
    page = null; // Was a string but converted into a number by IConversionOption
    version = null; // Was a string but converted into a float by IConversionOption

    constructor(data) {
        super();

        this.update(data);
    }

    update(data) {
        const conversionOptions = {
            results: ConversionTypeEnum.Boolean,
            page: ConversionTypeEnum.Number,
            version: ConversionTypeEnum.Float,
        };

        super.update(data, conversionOptions);
    }

}
``` 

TypeScript Version

```javascript
import {BaseModel, ConversionTypeEnum, IConversionOption} from 'sjs-base-model';

export default class SomeModel extends BaseModel {

    public seed: string = '';
    public results: boolean = false; // Was a string but converted into a boolean by IConversionOption
    public page: number = null; // Was a string but converted into a number by IConversionOption
    public version: number = null; // Was a string but converted into a float by IConversionOption

    constructor(data: Partial<SomeModel>) {
        super();

        this.update(data);
    }

    public update(data: Partial<SomeModel>): void {
        const conversionOptions: IConversionOption = {
            results: ConversionTypeEnum.Boolean,
            page: ConversionTypeEnum.Number,
            version: ConversionTypeEnum.Float,
        };

        super.update(data, conversionOptions);
    }

}
```  

## BaseModel Properties
There are a couple of properties on the `BaseModel`. If you call the `.toJSON();` method on the model it will remove all `sjs-base-model` specific properties.

#### sjsId
Each `sjs-base-model` that is created has a unique model id. You can access it by the `sjsId` property.

```javascript
const carModel = new CarModel();

carModel.sjsId; // unique model id
```

#### sjsOptions
TODO

## BaseModel Methods

#### update(json)
Example how to use the `update` method which will only change the property value(s) that were passed in.

```javascript
carModel.update({year: 2015, feature: {abs: true}});
```

#### toJSON()
Converts the BaseModel data into a JSON object and deletes the sjsId property.

```javascript
const json = carModel.toJSON();
```

#### toJSONString()
Converts a BaseModel to a JSON string,

```javascript
const jsonStr = carModel.toJSONString();
```

#### fromJSON(jsonString)
Converts the string json data into an Object and calls the update method with the converted Object.

```javascript
 const str = '{"make":"Tesla","model":"Model S","year":2014}'
 const carModel = new CarModel();
 carModel.fromJSON(str);
```

#### clone()
Creates a clone/copy of the BaseModel.

```javascript
const clone = carModel.clone();
```

## TypeScript Usage
You will need to do `as any` when assigning the function model to the type of model so the compiler doesn't complain. Notice `FeatureModel as any;` and `[ColorModel as any];`

```typescript
import {BaseModel} from 'sjs-base-model';
    
export default class CarModel extends BaseModel {
    
    make: string = '';
    model: string = '';
    year: number = null;
    
    feature: FeatureModel = FeatureModel as any;
    
    colors: ColorModel[] = [ColorModel as any];
    
    constructor(data: Partial<CarModel>) {
        super();
    
        this.update(data);
    }
    
    update(data: Partial<CarModel>): void {
        super.update(data);
        
        this.year = data.YeAr;
    }
    
}
```

## Real World
I like to keep my data consistent in my applications. So I like everything to be `camelCase`. It's hard when dealing with different data api's. Each one can return a differnt case type (`kebab-case`, `snake_case`, `PascalCase`, `camelCase`, `UPPER_CASE` and this one `@propertyName`). 

What you can do is create a class called [PropertyNormalizerModel](https://gist.github.com/codeBelt/5ae6ff9474340a77e2ab4abbb9204aba#file-propertynormalizermodel-ts) that extends `sjs-base-mode` that normalizes the data coming in. Then all your other models extends PropertyNormalizerModel.

See [example code](https://gist.github.com/codeBelt/5ae6ff9474340a77e2ab4abbb9204aba) for ideas.


## Release History

 * 2018-05-09 v1.5.0 Rename IConvertOption to IConversionOption to match with ConversionTypeEnum

 * 2018-04-20 v1.4.0 Add the ability to convert property values to ConversionTypeEnum.Float, ConversionTypeEnum.Number or ConversionTypeEnum.Boolean with IConvertOption.
 
 * 2018-04-15 v1.3.2 Make the clone method a Generic TypeScript type. ```model.clone<SomeModel>();```
 
 * 2018-04-10 v1.3.1 Update to previous version (v1.3.0) to allow other types not just objects. Now will add number, string, etc.
 
 * 2018-03-29 v1.3.0 If the default property value is an array and a object is passed for that property. It will put that object into an array.
 
 * 2018-03-20 v1.2.0 Handle null being passed in and console.error message. Remove null check condition from constructor in code examples.
 
 * 2018-03-05 v1.1.0 Fixed issue: If an array of data passed in with no BaseModel assigned. It would set it as an empty array. Now it will assign the raw array data correctly.
 
 * 2018-02-24 v1.0.0

# swagger 初始化流程

- 安裝套件

```
yarn add swagger-autogen swagger-ui-express
```

- 建立 `swagger.js`

```js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles);
```

- 新增 `package.json` 裡的 `scripts`

```json
...
"swagger-autogen": "node ./swagger.js"
...
```

- run autogen，即生成 `swagger_output.json`

```
yarn swagger-autogen
```

- 到 `app.js` 裡 (_重要_)

```js
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
```

## 參考資料

- [使用 Swagger 自動生成 API 文件 - 是 Ray 不是 Array](https://israynotarray.com/nodejs/20201229/1974873838/)

---

# swagger 註解寫法

- 注意：要寫在 controller 的方法裡面

ex:

```js
app.get('/path/:id', (req, res) => {
    ...
    //  #swagger.parameters['id'] = { description: 'Some description...' }
    ...
});

app.post('/path', (req, res) => {
    ...
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Some description...',
            schema: {
                $name: 'Jhon Doe',
                $age: 29,
                about: ''
            }
    } */
    ...
})
```

## 參考資料

[swagger-autogen(NPM Pacakge)](https://www.npmjs.com/package/swagger-autogen)
# 啟動

- 安裝套件

```
yarn
// or run `npm install`
```

- 把 `./config/config.default.js` 複製成 `./config/config.js`，再把相關的欄位換成符合當下的環境

- 啟動

```
yarn start
// or run `npm start`
```

# swagger

- 更新 swagger_output.json

```
yarn swagger-autogen
```

- 啟動 server 後至 `/api-doc` 就可以看到

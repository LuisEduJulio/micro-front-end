# micro-front-end

## Configurando Ambiente Local

```
Com Docker: 
1 - docker-compose up 

Sem Docker: 
1 - Abrir as pastas e rodar os comandos npm i ou npm install
2 - Rodar os projetos nas respectivas pastas npm start

```

## Configurando Novo Micro Front-End

```
1 - Criar uma pasta config com os arquivos webpack.common.js e webpack.dev.js
2 - Dentro do arquivo webpack.common.js colar 

module.exports = {
    target: 'web',
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    }
}

que irá monitora o webpack.dev.js

3 - Dentro do arquivo webpack.dev.js colar

const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    port: 3010,
    historyApiFallback: {
      index: "index.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "table",
      filename: "remoteEntry.js",
      exposes: {
        "./RemoteTable": "./src/bootstrap",
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

mode: Ambiente do MFE
devServer: Configurações de servidor do MFE, como porta e arquivo que irá retorna os dados para o navegador.
plugins: Configurações de pastas e arquivo root do projeto
    ModuleFederationPlugin: 
        name: Nome do MFE.
        filename: Nome atribuído que será escutado dentro de outro MFE ou projeto.
        exposes: Arquivo que será escutado dentro de outro MFE ou projeto.
    HtmlWebpackPlugin: Template aonde será retornado no navegador.    

4 - Criar arquivo bootstrap.js aonde será importado o projeto e exportado para consumo

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mount = (props, el) => {
    ReactDOM.render(
        <App {...props} />,
        el
    )
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_table-root');

    if (devRoot) {
        mount({}, devRoot);
    }
}

export { mount };

5 - Definir no index.html o id do root do app aonde será retornado 

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Table</title>
</head>

<body>
    <div id="_table-root"></div>
</body>

</html>

```

## Configurando Container ou receptor do Micro Front-End

```
1 - Criar uma pasta config com os arquivos webpack.common.js e webpack.dev.js
2 - Dentro do arquivo webpack.common.js colar 

module.exports = {
    target: 'web',
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            }
        ]
    }
}

que irá monitora o webpack.dev.js

3 - Dentro do arquivo webpack.dev.js colar

const webpack = require("webpack");
const dotenv = require("dotenv");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  resolve: {
    extensions: [".jsx", ".js", ".json", ".css"],
    fallback: { stream: false },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader?limit=100000",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        table: "table@http://localhost:3010/remoteEntry.js",
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed), // it will automatically pick up key values from .env file
      "process.env.NODE_ENV": JSON.stringify('development'), // it will automatically pick up the value for NODE_ENV
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);

mode: Ambiente do MFE
devServer: Configurações de servidor do MFE, como porta e arquivo que irá retorna os dados para o navegador.
plugins: Configurações de pastas e arquivo root do projeto
    ModuleFederationPlugin: 
        name: Nome do MFE.
        filename: Nome atribuído que será escutado dentro de outro MFE ou projeto.
        remotes: Receptor dos micros front-ends.
    HtmlWebpackPlugin: Template aonde será retornado no navegador.    

4 - Criar uma pasta remotes
5 - Criar o arquivo RemoteTable.js e colar dentro dele 

import { mount } from "table/RemoteTable";
import React, { useRef, useEffect } from "react";

export default (props) => {
    const ref = useRef(null);

    useEffect(() => {
        mount(props, ref.current);
    });

    return <div ref={ref} />;
};

6 - Cirar o arquivo ErrorBoundary, que irá monitorá os erros de conexão com mfe

import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>

                </div>
            );
        }
        return this.props.children;
    }
}

7 - Importar na view ou components aonde será copnsumido o mfe

const RemoteTable = lazy(() => import("../../remotes/RemoteTable"));

8 - Importar Component, lazy, Suspense do react e o ErrorBoundary e encapsular o mfe

<ErrorBoundary>
    <Suspense
        fallback={
            <LoadingComponent />
        }
    >
        <RemoteTable {...this.props} />
    </Suspense>
</ErrorBoundary>


```

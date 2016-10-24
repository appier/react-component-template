# react-component-template

Reference implementations for widely used React widget.
Please notice, this is not a component library for you to use directly.
Instead, we provide the minimal implementation for some common components.
You can simply copy and paste code to your project, and customize it as you need.

DEMO Link: https://appier.github.io/react-component-template/build_storybook/

## Why this project?

The most frontend developer will use third-parties libraries for developing products.
However, Those 3-parties libraries fail to meet our need and hard to customize from time to time.

Another problem is that even those 3-parties libraries can fulfill our all requirements, the whole libraries may be bloated or have performance issues. For example, react-select has more than 70 props to satisfy the requirement from different users. and whole codebase contains more 10k LOC.

In our experience, we find that copy the minimal functionality and component to a new project, and then customize it for that projects can make our project UI more consistent and flexible for change.

Thus, we open those components with lovely storybook UI for other developers as a reference.


## Compoents

Currently we have the following reference implementations.

* [Calendar](https://github.com/appier/react-component-template/tree/master/src/Calendar)
* [DatePicker](https://github.com/appier/react-component-template/tree/master/src/DatePicker)
* [MultiSelector](https://github.com/appier/react-component-template/tree/master/src/MultiSelector)
* [D3 Chart Integration](https://github.com/appier/react-component-template/tree/master/src/D3)
* [Three.js Intergration](https://github.com/appier/react-component-template/tree/master/src/ThreeRender)


## Development

Setup:

```
npm install
```

Run:

```
npm start
```

And open storybook with browser: http://localhost:9001/

## Deploy

```
npm run deploy
```


## License

MIT Licensed. Copyright (c) Appier Inc.
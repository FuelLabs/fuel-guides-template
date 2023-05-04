# Fuel Journey

To run the repo locally, clone the repo with the `--recursive` flag to also clone the submodules.

## Local Setup

```
git clone --recursive https://github.com/FuelLabs/fuel-journey
```

Then you can install the dependencies and run it with

```
npm install
npm run dev
```

## Contributing

All of the main content lives in the `journey` folder. You can pull in content from other repos by adding them as a submodule.

To import text from a `.md` file (for example, from one of the mdbooks), you can use the `MDXImport` component as shown below:

```jsx
<MDXImport
file="../../path/to/index.md"
comment="fuelup"
/>
```

This will pull in the text in between matching comments like this:

```
<!-- This example should include a summary of fuelup -->
<!-- fuelup:example:start -->
CONTENT
<!-- fuelup:example:end -->
```

The first comment can be anything, it just should explain the purpose of this content snippet.

To pull in code, you can use the `CodeImport` component.

```jsx
<CodeImport
file="../../path/to/index.md"
comment="install"
commentType="<!--"
lang="shell"
trim="true"
/>
```

The `comment` prop is the name of the comment that comes before `:example:start` and `:example:end`.
The `commentType` prop is the comment syntax used in the file. It can be either `<!--`, `{/*`, or `//`.
The `lang` prop is used to format the code.
The `trim` prop removes the 1st and last lines of the example. 

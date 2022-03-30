# Next React Three Fiber Shader Base Starter

Next.js + R3F starter repository for 2D shader development.

## Bootstrapping Next.js starters

```js
yarn create next-app [project-name] -e [GitHub URL]
# or
npx create-next-app [project-name] -e [GitHub URL]
```

## Adding shaders to your network

1. Set up each shader as a material in `shaderMaterials.js`, including shader files and uniforms.
2. Add each shader to the `MainScene` using the `useInitShader` hook (including input textures/assets).
3. Set render outputs if needed using the `setRenderOutputs` method from the objects returned by the `useInitShader` hooks.
4. Group shaders as an array (in the order they should be rendered) and pass as the `shaders` prop to the `MainShaders` component.
## Usage of external libs/components

<!-- Feel free to rewrite what I'm trying to say here -->

Avoid using external components across the project in multiple places. Prefer instead to create our own component inside `components/common` that uses the external components that you need and create an easy interface for its usage that can last long enought in this repository even if we decide to change external libraries.

### @mui/material

For example, for the components of the Material UI, let's try to use them only inside our components from `components/common` and avoid exposing props that are too specific for it's usage, such as `sx`. We can use `sx` while using the @mui/material component inside our common components and expose only what is necessary so we can avoid having a strong coupling.

# coolgebra-js

A cool vector & matrix math API that allows chaining and nesting of operations.
I went to all this trouble because I am lazy and wanted an intuitive and painless way to write complex linear algebra functions in my projects.

Coolgebra has low overhead as, even though the syntax is designed to feel as if a new vector object is instantiated with each operation, it is not. Instead, the module exposes a singleton containing all the methods, all of which return the singleton to make it chainable, and all results are stored as simple arrays on a module-scoped stack, which is what makes it nestable.

coolgebra.js is a work in progress. It is written in ES6 and may need to be transpiled for browser environments.
Require it in your build and assign it to the $ variable.

**API:**

Vectors are represented by arrays.
<br/>[x,y,z,w]
  
Wrap the first vector in your sequence with $().
<br/>$([x,y,z])

Chain as many operations as you want.
<br/>Terminate the sequence with .$$
<br/>$([1,1]).plus(3).times([4,5]).rotate(1,2).unit().$$
<br/>==> [-0.9019371851463437, 0.4318672412331016]

You can nest operations:
<br/>$([3,4]).plus  **($([1,1]).times(3).$$)**  .$$

as long as each nested sequence begins and terminates with $() and .$$.
(Spaces added for clarity, delete in actual code.)

List of operations coming soon.

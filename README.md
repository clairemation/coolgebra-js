# coolgebra-js

A performant and flexible linear algebra API.
I made this because I wanted a way to do complex vector calculations without incurring the overhead of a new object for every operation, but with painless syntax.

Coolgebra achieves performance by caching as much as possible. Even though the syntax is designed to feel like any other chainable function library, where a new object and context are instantiated and returned with each operation, it is not. Instead, the module exposes a singleton containing all the methods, all of which return the singleton to make it chainable, and all results are stored as simple arrays on a module-scoped stack, which is what makes it nestable.

Coolgebra is a work in progress. It is written in ES6 and may need to be transpiled for browser environments.
Require it in your build and assign it to the $ variable.

**API:**

Vectors parameters are represented by arrays.
<br/>([x,y,z,w])
  
Prepend the first argument in your sequence with $.
<br/>$([x,y,z])

Chain as many operations as you want.
<br/>Terminate the sequence with .$.
<br/>$([1,1]).plus(3).times([4,5]).rotate(0.33).unit().$
<br/>==> [-0.9019371851463437, 0.4318672412331016]

You can nest operations:
<br/>$([3,4]).plus  **($([1,1]).times(3).$)**  .$

as long as each nested sequence begins with $ and terminates with .$.
(Spaces added for clarity, delete in actual code.)

List of operations coming soon.
